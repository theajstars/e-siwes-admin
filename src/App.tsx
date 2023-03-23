import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Button } from "@chakra-ui/react";
import { Login } from "./Pages/Login";
import Home from "./Pages/Home";
import Supervisors from "./Pages/Supervisors";
import Students from "./Pages/Students";
import Profile from "./Pages/Profile";
import Cookies from "js-cookie";
import Notification from "./Pages/Notification";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />}>
          <Route path="/home/supervisors" element={<Supervisors />} />
          <Route path="/home/students" element={<Students />} />
          <Route path="/home/profile" element={<Profile />} />
          <Route path="/home/notification" element={<Notification />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
