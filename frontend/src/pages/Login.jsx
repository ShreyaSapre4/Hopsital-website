import React, { useContext, useState } from "react";
import { Context } from "../main";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../../public/css/pages/login.scss";

const Login = () => {
  const { authenticated, setAuthenticated } = useContext(Context);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post(
          "http://localhost:4000/api/v1/user/login",
          { email, password, role: "Patient" },
          {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
          }
        )
        .then((res) => {
          toast.success(res.data.message);
          setAuthenticated(true);
          navigate("/");
          setEmail("");
          setPassword("");
          console.log("Login:", authenticated);
        });
    } catch (error) {
      toast.error(error.response.data.message);
    }

    if (authenticated) {
      return <Navigate to={"/"} />;
    }
  };
  return (
    <>
      <Navbar />
      <div className="login-page">
        <form onSubmit={handleLogin}>
          <h1>Login</h1>
          <div>
            <input
              type="text"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <button type="submit">Submit</button>
          </div>
          <div>
            <p>
              Don't have an account? <Link to={"/register"}>Register</Link>
            </p>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default Login;
