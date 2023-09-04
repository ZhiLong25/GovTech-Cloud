import { React, useState } from "react";
import { Container, Box, Typography, TextField, Button } from "@mui/material";
import * as yup from 'yup';
import http from '../http';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";

function Register() {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      Name: '',
      Email: '',
      Password: '',
    },
    validationSchema: yup.object().shape({
      Name: yup
        .string()
        .trim()
        .matches(/^[a-z ,.'-]+$/i, "Invalid name")
        .min(3, "Name must be at least 3 characters")
        .max(50, "Name must be at most 50 characters")
        .required("Name is required"),
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
      confirmPassword: yup
        .string()
        .trim()
        .required("Confirm password is required")
        .oneOf([yup.ref("Password"), null], "Passwords must match"),
    }),

    onSubmit: (data) => {

      http.post("http://localhost:3001/user/register", data)
        .then((res) => {
          console.log(res.data);
          navigate("/login");
        })
        .catch(function (err) {
          toast.error(`${err.response}`);
        });
    }
  });

  return (
    <Container sx={{
      marginTop: 8,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      <Typography variant="h5" sx={{ my: 2 }}>
        Register
      </Typography>

      <Box component="form" onSubmit={formik.handleSubmit} className='innerbox'>

        <TextField
          fullWidth margin="normal" autoComplete="off"
          label="Name"
          name="Name"
          value={formik.values.Name}
          onChange={formik.handleChange}
          error={formik.touched.Name && Boolean(formik.errors.Name)}
          helperText={formik.touched.Name && formik.errors.Name}
        />

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

        <TextField
          fullWidth margin="normal" autoComplete="off"
          label="Confirm Password"
          name="confirmPassword"
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
          error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
          helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
        />



        <Box sx={{ mt: 2 }}>
          <Button variant="contained" type="submit">
            Register
          </Button>
        </Box>
      </Box>
      <ToastContainer />
    </Container>
  );
}

export default Register;