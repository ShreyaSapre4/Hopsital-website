import React, { useContext, useState } from "react";
import { FaUserMd, FaHome } from "react-icons/fa";
import { FiLogOut, FiMessageSquare } from "react-icons/fi";
import { IoPersonAddSharp } from "react-icons/io5";
import { MdAddModerator } from "react-icons/md";
import { Link } from "react-router-dom";
import "../../public/css/components/sidebar.scss";
import { Context } from "../main";
import axios from "axios";
import { toast } from "react-toastify";

function Sidebar() {
  const [show, setShow] = useState(false);

  const { isAuthenticated, setIsAuthenticated } = useContext(Context);

  const handleLogout = async () => {
    await axios
      .get("http://localhost:4000/api/v1/user/admin/logout", {
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

  return (
    <div
      className="sidebar"
      style={!isAuthenticated ? { display: "none" } : { display: "flex" }}
    >
      <h2>My App</h2>
      <ul type="none">
        <li>
          <Link to="/">
            <FaHome className="icon" />
          </Link>
        </li>
        <li>
          <Link to="/doctors">
            <FaUserMd className="icon" />
          </Link>
        </li>
        <li>
          <Link to="/admin/register">
            <MdAddModerator className="icon" />
          </Link>
        </li>
        <li>
          <Link to="/doctor/register">
            <IoPersonAddSharp className="icon" />
          </Link>
        </li>
        <li>
          <Link to="/messages">
            <FiMessageSquare className="icon" />
          </Link>
        </li>
      </ul>
      <FiLogOut onClick={handleLogout} className="logout-icon" />
    </div>
  );
}

export default Sidebar;
