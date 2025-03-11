import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Alert,
  Chip,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DeleteIcon from "@mui/icons-material/Delete";

const ViewMyTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = () => {
    const token = sessionStorage.getItem("Token");
    const userId = sessionStorage.getItem("UserId");

    if (!token || !userId) {
      setError("Unauthorized: Please log in.");
      return;
    }

    axios
      .post(
        "http://localhost:8080/viewMine",
        { userId: parseInt(userId) },
        { headers: { Authorization: token } }
      )
      .then((response) => setTasks(response.data))
      .catch((err) => {
        console.error("Error fetching tasks:", err);
        setError("Failed to load tasks.");
      });
  };

  const markTaskComplete = (taskId) => {
    const token = sessionStorage.getItem("Token");

    axios
      .post(
        "http://localhost:8080/completeTask",
        { taskId: taskId },
        { headers: { Authorization: token } }
      )
      .then(() => {
        alert("Task completed successfully!");
        fetchTasks();
      })
      .catch((err) => {
        console.error("Error completing task:", err);
        setError("Failed to complete task.");
      });
  };

  const deleteTask = (taskId) => {
    const token = sessionStorage.getItem("Token");

    axios
      .delete(`http://localhost:8080/deleteTask/${taskId}`, {
        headers: { Authorization: token },
      })
      .then(() => {
        alert("Task deleted successfully!");
        fetchTasks();
      })
      .catch((err) => {
        console.error("Error deleting task:", err);
        setError("Failed to delete task.");
      });
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>My Tasks</Typography>
      {error && <Alert severity="error">{error}</Alert>}
      <Grid container spacing={3}>
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <Grid item xs={12} sm={6} md={4} key={task.id}>
              <Card sx={{ padding: 2 }}>
                <CardContent>
                  <Typography variant="h6">{task.title}</Typography>
                  <Typography variant="body2">Description: {task.description}</Typography>
                  <Typography variant="body2">Priority: {task.priority}</Typography>
                  <Typography variant="body2">Date: {task.date} | Time: {task.time}</Typography>
                </CardContent>
                <CardActions>
                  <Button
                    startIcon={<CheckCircleIcon />}
                    color="success"
                    onClick={() => markTaskComplete(task.id)}
                  >
                    Complete
                  </Button>
                  <Button
                    startIcon={<DeleteIcon />}
                    color="error"
                    onClick={() => deleteTask(task.id)}
                  >
                    Delete
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography>No tasks found.</Typography>
        )}
      </Grid>
    </Container>
  );
};

export default ViewMyTasks;
