import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Context } from "../main";
import axios from "axios";
import "../../public/css/pages/newDoc.scss";
import doctor from "../../public/images/doctor.jpg";

function AddNewDoc() {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [doctorDept, setDoctorDepartment] = useState("");
  const [docAvatar, setDocAvatar] = useState("");
  const [docAvatarPreview, setDocAvatarPreview] = useState("");

  const departmentArray = [
    "Cardiology",
    "Dermatology",
    "Neurology",
    "Obstetrics and Gynecology",
    "Orthopedics",
    "Urology",
  ];

  const handleAvatar = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setDocAvatarPreview(reader.result);
      setDocAvatar(file);
    };
  };

  const handleAddNewDoctor = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("password", password);
      formData.append("dob", dob);
      formData.append("gender", gender);
      formData.append("docDept", doctorDept);
      formData.append("docAvatar", docAvatar);
      console.log(
        firstName,
        lastName,
        email,
        phone,
        password,
        dob,
        gender,
        doctorDept,
        docAvatar
      );
      await axios
        .post("http://localhost:4000/api/v1/user/doctor/register", formData, {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => {
          toast.success(res.data.message);
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
      toast.error(error.res.data.message);
    }
  };

  if (!isAuthenticated) {
    navigateTo("/login");
  }

  return (
    <div>
      <section className="page">
        <section className="container add-doctor-form">
          <h1 className="form-title">REGISTER A NEW DOCTOR</h1>
          <form onSubmit={handleAddNewDoctor}>
            <div className="first-wrapper">
              <div>
                <img
                  src={docAvatarPreview ? `${docAvatarPreview}` : doctor}
                  alt=""
                />
                <input type="file" onChange={handleAvatar} />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Mobile Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <input
                  type={"date"}
                  placeholder="Date of Birth"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                />
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <select
                  value={doctorDept}
                  onChange={(e) => {
                    setDoctorDepartment(e.target.value);
                  }}
                >
                  <option value="">Select Department</option>
                  {departmentArray.map((depart, index) => {
                    return (
                      <option value={depart} key={index}>
                        {depart}
                      </option>
                    );
                  })}
                </select>
                <button type="submit">Register New Doctor</button>
              </div>
            </div>
          </form>
        </section>
      </section>
    </div>
  );
}

export default AddNewDoc;
