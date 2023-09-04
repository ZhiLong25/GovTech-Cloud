import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import { Container, Box, AppBar, Toolbar, Typography } from '@mui/material';
import './styles/Home.css';
import { DataGrid } from '@mui/x-data-grid';
import * as yup from 'yup';
import http from '../http';


function Records() {
  const navigate = useNavigate();
  const [recordsList, setRecordsList] = useState([]);
  const [total, setTotal] = useState(0);

  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'Name', headerName: 'Name', width: 200 },
    { field: 'Temperature', headerName: 'Temperature', width: 150 },
    { field: 'Symptoms', headerName: 'Symptoms', width: 300 },
    { field: 'Contact', headerName: 'Contact', width: 200 },
  ];


  useEffect(() => {

    const getRecords = () => {
      http.get("http://localhost:3001/record").then((res) => {
        setRecordsList(res.data);
        setTotal(res.data.length);
        console.log(res.data);
      });
    };

    getRecords();
  }, []);


  return (

    <Container style={{ paddingTop: "100px", height: "100vh" }}>
      <Typography variant="h5" sx={{ my: 2 }} style={{ paddingLeft: "20px"}} >
        Records Database
      </Typography>
      <Box style={{ padding: "20px" }}>
        <DataGrid
          rows={recordsList}
          columns={columns}

          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}

        />
      </Box>
    </Container>
  );
}

export default Records;