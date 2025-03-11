import React, { useState } from "react";
import axios from "axios";
import { Container, TextField, Button, Typography, Paper, Box } from "@mui/material";

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
    phoneNumber: "",
    firstName: "",
    lastName: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/signup", formData);
      setMessage(response.data.Message);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <Container maxWidth="xs">
      <Paper elevation={3} sx={{ padding: 3, textAlign: "center", mt: 5 }}>
        <Typography variant="h5">Sign Up</Typography>
        {message && <Typography color="success.main">{message}</Typography>}
        {error && <Typography color="error.main">{error}</Typography>}
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <TextField fullWidth label="First Name" name="firstName" onChange={handleChange} required sx={{ mb: 2 }} />
          <TextField fullWidth label="Last Name" name="lastName" onChange={handleChange} required sx={{ mb: 2 }} />
          <TextField fullWidth label="Username" name="username" onChange={handleChange} required sx={{ mb: 2 }} />
          <TextField fullWidth label="Email" type="email" name="email" onChange={handleChange} required sx={{ mb: 2 }} />
          <TextField fullWidth label="Phone Number" name="phoneNumber" onChange={handleChange} required sx={{ mb: 2 }} />
          <TextField fullWidth label="Password" type="password" name="password" onChange={handleChange} required sx={{ mb: 2 }} />
          <TextField fullWidth label="Confirm Password" type="password" name="confirmPassword" onChange={handleChange} required sx={{ mb: 2 }} />
          <Button type="submit" variant="contained" color="primary" fullWidth>Register</Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default SignUp;
