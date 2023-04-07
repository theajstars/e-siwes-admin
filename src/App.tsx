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
import SingleSupervisor from "./Pages/SingleSupervisor";
import SingleStudent from "./Pages/SingleStudent";
import Reset from "./Pages/Reset";

function validateEmail(email: string) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
type CourseSlugs =
  | "cyber_security"
  | "software_engineering"
  | "computer_science"
  | "information_technology"
  | string;
const getCourseName = (courseSlug: CourseSlugs) => {
  if (courseSlug) {
    switch (courseSlug) {
      case "":
        // Student has not selected course
        return undefined;
        break;
      case "cyber_security":
        return "Cyber Security";
        break;
      case "computer_science":
        return "Computer Science";
        break;
      case "information_technology":
        return "Information Technology";
        break;
      case "software_engineering":
        return "Software Engineering";
        break;
      default:
        return undefined;
    }
  }
  return undefined;
};
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reset" element={<Reset />} />
        <Route path="/home" element={<Home />}>
          <Route path="/home/supervisors" element={<Supervisors />} />
          <Route
            path="/home/supervisors/:supervisorID"
            element={<SingleSupervisor />}
          />
          <Route path="/home/students" element={<Students />} />
          <Route path="/home/students/:studentID" element={<SingleStudent />} />
          <Route path="/home/profile" element={<Profile />} />
          <Route path="/home/notification" element={<Notification />} />
        </Route>
      </Routes>
    </Router>
  );
}

export { validateEmail, getCourseName };
export default App;
