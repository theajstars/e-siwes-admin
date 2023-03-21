import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

import Logo from "../../Assets/IMG/Logo.png";
import Container from "../Container";

type NavItems = "Home" | "Students" | "Supervisors" | "Profile" | string;
export default function Navbar() {
  const location = useLocation();
  const [activeItem, setActiveItem] = useState<NavItems>("Home");

  // useEffect(() => {
  //   const pathname = location.pathname;
  //   const lastIndex = pathname.lastIndexOf("/");
  //   let path = pathname.substring(lastIndex, pathname.length).replace("/", "");
  //   const remainingString = path.substring(1, path.length);
  //   path = path[0].toUpperCase().concat(remainingString);
  //   console.log(path);
  //   setActiveItem(path);
  // }, [location]);

  return (
    <div className="nav-container flex-row">
      <Container>
        <nav className="nav flex-row">
          <Link to="/home">
            <img src={Logo} className="nav-logo" alt="" />
          </Link>
          <div className="nav-items flex-row">
            <Link
              to="/home"
              className={`nav-item ${
                activeItem === "Home" ? "nav-item-active" : ""
              }`}
            >
              Home
            </Link>
            <Link
              to="/home/students"
              className={`nav-item ${
                activeItem === "Students" ? "nav-item-active" : ""
              }`}
            >
              Students
            </Link>
            <Link
              to="/home/supervisors"
              className={`nav-item ${
                activeItem === "Supervisors" ? "nav-item-active" : ""
              }`}
            >
              Supervisors
            </Link>
            <Link
              to="/home/profile"
              className={`nav-item ${
                activeItem === "Profile" ? "nav-item-active" : ""
              }`}
            >
              Profile
            </Link>
          </div>
        </nav>
      </Container>
    </div>
  );
}
