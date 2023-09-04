
import React, { useContext, useState, useEffect } from "react";
import { Container, Box, Typography, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import http from "../http";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserContext from "../contexts/UserContext";
import './styles/Home.css';

function Login() {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const formik = useFormik({

    initialValues: {
      Email: "",
      Password: "",
    },
    validationSchema: yup.object().shape({
      Email: yup
        .string()
        .trim()
        .email("Enter a valid email")
        .max(50, "Email must be at most 50 characters")
        .required("Email is required"),
      Password: yup
        .string()
        .trim()
        .min(8, "Password must be at least 8 characters")
        .max(50, "Password must be at most 50 characters")
        .required("Password is required"),
    }),
    onSubmit: (data) => {
      data.Email = data.Email.trim().toLowerCase();
      data.Password = data.Password.trim();
      http
        .post("http://localhost:3001/user/login", data)
        .then((res) => {

          localStorage.setItem("accessToken", res.data.accessToken);
          setUser(res.data.user);
          navigate("/");
          console.log(data);
        })
        .catch(function (err) {
          toast.error(`${err.response}`);
        });
    },
  });

  return (
    <Container sx={{
      marginTop: 8,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      <Typography variant="h5" sx={{ my: 2 }}>
        Login
      </Typography>

      <Box component="form" onSubmit={formik.handleSubmit} className='innerbox'>
        <TextField
          fullWidth margin="normal" autoComplete="off"
          label="Email"
          name="Email"
          value={formik.values.Email}
          onChange={formik.handleChange}
          error={formik.touched.Email && Boolean(formik.errors.Email)}
          helperText={formik.touched.Email && formik.errors.Email}
        />

        <TextField
          fullWidth margin="normal" autoComplete="off"
          label="Password"
          name="Password"
          value={formik.values.Password}
          onChange={formik.handleChange}
          error={formik.touched.Password && Boolean(formik.errors.Password)}
          helperText={formik.touched.Password && formik.errors.Password}
        />

      <Box sx={{ mt: 2 }}>
          <Button variant="contained" type="submit">
            Login
          </Button>
        </Box>
      </Box>


      <ToastContainer />
    </Container>

  );
}

export default Login;
