import React, { useContext, useState } from "react";
import { Context } from "../main";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "../../public/css/pages/register.scss";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Register() {
  const { authenticated, setAuthenticated } = useContext(Context);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleRegistration = async (e) => {
    e.preventDefault();

    try {
      await axios
        .post(
          "http://localhost:4000/api/v1/user/patient/register",
          {
            firstName,
            lastName,
            email,
            phone,
            dob,
            gender,
            password,
            role: "Patient",
          },
          {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
          }
        )
        .then((res) => {
          toast.success(res.data.message);
          setAuthenticated(true);
          navigate("/");
          setFirstName("");
          setLastName("");
          setEmail("");
          setPhone("");
          setDob("");
          setGender("");
          setPassword("");
        });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <Navbar />
      <div className="register-page">
        <form onSubmit={handleRegistration}>
          <h1>Register</h1>
          <div>
            <input
              type="text"
              value={firstName}
              placeholder="FirstName"
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div>
            <input
              type="text"
              value={lastName}
              placeholder="LastName"
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div>
            <input
              type="text"
              value={phone}
              placeholder="Phone number"
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
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
            <input
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
            />
          </div>
          <div>
            <select
              placeholder={"Select gender"}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="">Select gender</option>
              <option value="female">Female</option>
              <option value="male">Male</option>
            </select>
          </div>
          <div>
            <button type="submit">Submit</button>
          </div>
          <div>
            <p>
              Already have an account? <Link to={"/login"}>Login</Link>
            </p>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
}

export default Register;
