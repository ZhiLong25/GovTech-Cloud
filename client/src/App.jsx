import React, { useEffect, useState } from "react";
import './App.css'
import { Container, AppBar, Toolbar, Typography } from '@mui/material';
import Register from "./pages/Register";
import Login from "./pages/Login";
import Form from "./pages/Form";
import Navbar from "./assets/components/Navbar"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserContext from "./contexts/UserContext";
import http from "./http";
import DisplayRecords from "./pages/Records";

function App() {
  const [user, setUser] = useState(null);
  const [userid, setUserid] = useState(null);

  useEffect(() => {
    const getUser = () => {
      fetch("http://localhost:3001/auth/login/success", {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      })
        .then((response) => {
          if (response.status === 200) return response.json();
          throw new Error("authentication has been failed!");
        })
        .then((resObject) => {
          setUser(resObject.user);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getUser();
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        if (localStorage.getItem("accessToken")) {
          const authResponse = await http.get("/user/auth");
          setUser(authResponse.data.user);
          setUserid(authResponse.data.userid);

          const userDetailsResponse = await http.get(`user/userdetails/${authResponse.data.userid}`);
          setIsAdmin(userDetailsResponse.data.admin === true);
        }
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);

  // const logout = () => {
  //   localStorage.clear();
  //   sessionStorage.clear();
  //   window.location = "/";
  // };


  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Navbar />
      <Router>
        <Routes>
          <Route path="/" element={<Form />} />
          <Route path={"/register"} element={<Register />} />
          <Route path={"/login"} element={<Login />} />
          <Route path={"/display"} element={<DisplayRecords />} />
        </Routes>
      </Router>

    </UserContext.Provider>

  )
}

export default App
