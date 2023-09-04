import React, { useContext, useEffect, useState } from "react";
import { Box, Typography, TextField, Button, InputLabel, Select, MenuItem } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate, useLocation } from 'react-router-dom';
import './styles/Home.css';
import { useFormik } from "formik";
import UserContext from "../contexts/UserContext";
import * as yup from 'yup';
import http from '../http';

function Form() {
    const navigate = useNavigate();
    const { setUser, user } = useContext(UserContext);
    const formik = useFormik({
        initialValues: {
            Name: "",
            Temperature: "",
            Symptoms: "",
            Contact: false
        },

        validationSchema: yup.object({
            Name: yup.string().trim()
                .matches(/^[a-z ,.'-]+$/i, 'Invalid name')
                .min(3, 'Name must be at least 3 characters')
                .max(50, 'Name must be at most 50 characters')
                .required('Name is required'),
            Temperature: yup.number().required('Field is required')
                .min(1).max(100),
            Symptoms: yup.string().trim().required('Field is required'),
            Contact: yup.string().trim().required('Field is required')

        }),

        onSubmit: (data) => {
            data.Name = data.Name.trim();
            console.log("Press");
            http.post("http://localhost:3001/record", data)
                .then((res) => {
                    console.log(res.data);
                    navigate("/");
                    toast.success('Record submitted successfully');
                })
                .catch(function (err) {
                    toast.error(`${err.response.data.message}`);
                });
        }
    });


    return (
        <Box sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        }}>
            <Typography variant="h5" sx={{ my: 2 }} >
                Health Declaration
            </Typography>
            <Box component="form" sx={{ maxWidth: '500px' }} onSubmit={formik.handleSubmit}>
                <Typography id="name-label">Name</Typography>
                <TextField
                    fullWidth margin="normal" autoComplete="off"
                    label="Name"
                    labelId="name-label"
                    name="Name"
                    value={formik.values.Name}
                    onChange={formik.handleChange}
                    error={formik.touched.Name && Boolean(formik.errors.Name)}
                    helperText={formik.touched.Name && formik.errors.Name}
                />

                <Typography id="temperature-label">Temperature (°C)</Typography>
                <TextField
                    fullWidth margin="normal" autoComplete="off"
                    label="Temperature"
                    labelId="temperature-label"
                    name="Temperature"
                    value={formik.values.Temperature}
                    onChange={formik.handleChange}
                    error={formik.touched.Temperature && Boolean(formik.errors.Temperature)}
                    helperText={formik.touched.Temperature && formik.errors.Temperature}
                />

                <Typography id="symptoms-label">Do you have any of the following symptoms now or within the last 14 days? include mild symptoms if applicable</Typography>
                <TextField
                    fullWidth margin="normal" autoComplete="off"
                    label="Symptoms"
                    labelId="symptoms-label"
                    name="Symptoms"
                    value={formik.values.Symptoms}
                    onChange={formik.handleChange}
                    error={formik.touched.Symptoms && Boolean(formik.errors.Symptoms)}
                    helperText={formik.touched.Symptoms && formik.errors.Symptoms}
                />

                <Typography id="contact-label" style={{ marginBottom: "15px"}}>Have you been in contact with anyone who is suspected to have/ has been diagnosed with Covid-19 within the last 14 days?</Typography>
                <Select
                    fullWidth margin="normal"
                    labelId="contact-label"
                    name="Contact"
                    value={formik.values.Contact}
                    onChange={formik.handleChange}
                    error={formik.touched.Contact && Boolean(formik.errors.Contact)}
                    helperText={formik.touched.Contact && formik.errors.Contact}
                >   
                    <MenuItem value={true}>Yes</MenuItem>
                    <MenuItem value={false}>No</MenuItem>
                    
                </Select>


                <Button fullWidth variant="contained" sx={{ mt: 2 }}
                    type="submit">
                    Submit
                </Button>
            </Box>
            <ToastContainer />
        </Box>
    );
}

export default Form;