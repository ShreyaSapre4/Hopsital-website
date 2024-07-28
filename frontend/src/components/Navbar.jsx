import React, { useContext } from "react";
import "../../public/css/components/navbar.scss";
import logo from "../../public/images/image.png";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../main";
import axios from "axios";
import { toast } from "react-toastify";
import { IoIosLogOut } from "react-icons/io";

function Navbar() {
  const { authenticated, setAuthenticated } = useContext(Context);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await axios
      .get("http://localhost:4000/api/v1/user/patient/logout", {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
        setAuthenticated(false);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  const goToLogin = () => {
    navigate("/login");
    console.log("Navbar:", authenticated);
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <img src={logo} alt="Logo" />
      </div>
      <ul className="nav-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/appointment">Appointment</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
      </ul>
      {authenticated ? (
        <button className="login-btn" onClick={handleLogout}>
          <IoIosLogOut />
        </button>
      ) : (
        <button className="login-btn" onClick={goToLogin}>
          Login
        </button>
      )}
    </nav>
  );
}

export default Navbar;
