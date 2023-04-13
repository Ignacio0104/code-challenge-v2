import React from "react";
import "../style/Navbar.css";
import logoRick from "../assets/images/icon-header.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar-container">
      <h3>
        <Link className="link" style={{ textDecoration: "none" }} to="/">
          Rick and Morty API
        </Link>
      </h3>
      <img src={logoRick} className="navbar-icon" alt="navbar icon"></img>
    </div>
  );
};

export default Navbar;
