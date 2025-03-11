import axios from "axios";
import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  Box,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";

const AddToDo = () => {
  const name = sessionStorage.getItem("Name");

  const [todo, setTodo] = useState({
    title: "",
    description: "",
    time: "",
    date: "",
    priority: "",
    userId: sessionStorage.getItem("UserId"),
  });

  const handleChange = (e) => {
    setTodo({ ...todo, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8080/addToDo", todo, {
        headers: { Authorization: sessionStorage.getItem("Token") },
      });
      if (response.data.status === "Success") {
        alert("Successfully Added");
        setTodo({ title: "", description: "", time: "", date: "", priority: "", userId: sessionStorage.getItem("UserId") });
      } else {
        alert("Something went wrong");
      }
    } catch (err) {
      alert("Failed to add task. Please try again.");
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 3, textAlign: "center" }}>
        <Typography variant="h5">Welcome {name}, Add a New Task</Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <TextField
            fullWidth
            label="Title"
            name="title"
            value={todo.title}
            onChange={handleChange}
            required
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Description"
            name="description"
            value={todo.description}
            onChange={handleChange}
            required
            sx={{ mb: 2 }}
          />
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Priority</InputLabel>
            <Select
              name="priority"
              value={todo.priority}
              onChange={handleChange}
              required
            >
              <MenuItem value="High">High</MenuItem>
              <MenuItem value="Medium">Medium</MenuItem>
              <MenuItem value="Low">Low</MenuItem>
            </Select>
          </FormControl>
          <TextField
            fullWidth
            type="date"
            name="date"
            value={todo.date}
            onChange={handleChange}
            required
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            type="time"
            name="time"
            value={todo.time}
            onChange={handleChange}
            required
            sx={{ mb: 2 }}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Add Task
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default AddToDo;
