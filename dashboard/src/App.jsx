import { React, useContext, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./Components/Sidebar";
import Dashboard from "./Pages/Dashboard";
import Login from "./Pages/Login";
import AddNewDoc from "./Pages/AddNewDoc";
import AddNewAdmin from "./Pages/AddNewAdmin";
import Messages from "./Pages/Messages";
import Doctors from "./Pages/Doctors";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Context } from "./main";
import "./App.css";
import axios from "axios";

function App() {
  const { isAuthenticated, setIsAuthenticated, admin, setAdmin } =
    useContext(Context);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/v1/user/admin/me",
          { withCredentials: true }
        );

        setAdmin(response.data.admin);
        setIsAuthenticated(true);
      } catch (err) {
        toast.error(err.message);
      }
    };
    fetchUser();
  }, []);
  return (
    <>
      <BrowserRouter>
        <Sidebar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/doctor/register" element={<AddNewDoc />} />
          <Route path="/admin/register" element={<AddNewAdmin />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/messages" element={<Messages />} />
        </Routes>
        <ToastContainer position="bottom-right" />
      </BrowserRouter>
    </>
  );
}

export default App;
