import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Container, TextField, Button, Typography, Paper, Box } from "@mui/material";

const Login = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const response = await axios.post("http://localhost:8080/login", formData);
      if (response.data["Sign In"] === "Success") {
        setMessage("Login successful!");
        sessionStorage.setItem("Token", response.data.Token);
        sessionStorage.setItem("UserId", response.data.UserId);
        sessionStorage.setItem("Name", response.data.FirstName);
        navigate("/addtodo");
      } else {
        setError(response.data["User"]);
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <Container maxWidth="xs">
      <Paper elevation={3} sx={{ padding: 3, textAlign: "center", mt: 5 }}>
        <Typography variant="h5">Login</Typography>
        {message && <Typography color="success.main">{message}</Typography>}
        {error && <Typography color="error.main">{error}</Typography>}
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <TextField fullWidth label="Username" name="username" onChange={handleChange} required sx={{ mb: 2 }} />
          <TextField fullWidth label="Password" type="password" name="password" onChange={handleChange} required sx={{ mb: 2 }} />
          <Button type="submit" variant="contained" color="primary" fullWidth>Login</Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;
