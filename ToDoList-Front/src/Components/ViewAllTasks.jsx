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

const ViewAllTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");
  const role = sessionStorage.getItem("Role"); // Assuming "Role" is stored in sessionStorage

  useEffect(() => {
    if (role !== "admin") {
      setError("Access Denied: You are not an admin.");
      return;
    }

    fetchTasks();
  }, []);

  const fetchTasks = () => {
    const token = sessionStorage.getItem("Token");

    axios
      .get("http://localhost:8080/viewall", { headers: { Authorization: token } })
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
        alert("Task marked as complete!");
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
      <Typography variant="h4" gutterBottom>All Tasks (Admin View)</Typography>
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
                  <Typography variant="body2"><strong>User ID:</strong> {task.userId}</Typography>
                  {task.completed && (
                    <Chip label="Completed" color="success" variant="outlined" sx={{ mt: 1 }} />
                  )}
                </CardContent>
                <CardActions>
                  {!task.completed && (
                    <Button
                      startIcon={<CheckCircleIcon />}
                      color="success"
                      onClick={() => markTaskComplete(task.id)}
                    >
                      Complete
                    </Button>
                  )}
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

export default ViewAllTasks;
