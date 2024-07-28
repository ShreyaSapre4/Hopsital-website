import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import image from "../../public/images/appointmentImage.png";
import "../../public/css/components/appointmentForm.scss";

function AppointmentForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [department, setDepartment] = useState("");
  const [hasVisited, setHasVisited] = useState("");
  const [docFirstName, setDocFirstName] = useState("");
  const [docLastName, setDocLastName] = useState("");
  const [address, setAddress] = useState("");

  const departmentArray = [
    "Cardiology",
    "Dermatology",
    "Neurology",
    "Obstetrics and Gynecology",
    "Orthopedics",
    "Urology",
  ];

  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      const { data } = await axios.get(
        "http://localhost:4000/api/v1/user/doctors",
        { withCredentials: true }
      );
      setDoctors(data.doctors);
    };

    fetchDoctors();
  }, []);

  const handleAppointments = async (e) => {
    e.preventDefault();
    const hasVisitedBool = Boolean(hasVisited);

    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/appointment/post",
        {
          firstName,
          lastName,
          dob,
          gender,
          email,
          phone,
          appointment_date: appointmentDate,
          department,
          doctor_firstName: docFirstName,
          doctor_lastName: docLastName,
          address,
          hasVisited: hasVisitedBool,
        },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      toast.success(data.message);
      console.log(docFirstName, docLastName);
      setFirstName(""),
        setLastName(""),
        setEmail(""),
        setPhone(""),
        setDob(""),
        setGender(""),
        setAppointmentDate(""),
        setDepartment(""),
        setDocFirstName(""),
        setDocLastName(""),
        setHasVisited(""),
        setAddress("");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <div className="appointmentForm">
        <form onSubmit={handleAppointments}>
          <h1>Book Appointment</h1>
          <div className="form-grid">
            <div>
              <p>Firstname</p>
              <input
                type="text"
                value={firstName}
                placeholder="FirstName"
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div>
              <p>Lastname</p>
              <input
                type="text"
                value={lastName}
                placeholder="LastName"
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div>
              <p>Phone</p>
              <input
                type="text"
                value={phone}
                placeholder="Phone number"
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div>
              <p>Email</p>
              <input
                type="text"
                placeholder="E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <p>Birthdate</p>
              <input
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
              />
            </div>
            <div>
              <p>Gender</p>
              <br />
              <select
                onChange={(e) => setGender(e.target.value)}
                value={gender}
              >
                <option value="">Select gender</option>
                <option value="female">Female</option>
                <option value="male">Male</option>
              </select>
            </div>
            <div>
              <p>Date of appointment</p>
              <input
                type="date"
                value={appointmentDate}
                onChange={(e) => setAppointmentDate(e.target.value)}
              />
            </div>
            <div>
              <p>Department</p>
              <br />
              <select
                onChange={(e) => {
                  setDepartment(e.target.value);
                  setDocFirstName("");
                  setDocLastName("");
                }}
                value={department}
              >
                <option>Select Department</option>
                {departmentArray.map((dept, index) => {
                  return (
                    <option value={dept} key={index}>
                      {dept}
                    </option>
                  );
                })}
              </select>
            </div>
            <div>
              <p>Doctor</p>
              <br />
              <select
                value={`${docFirstName} ${docLastName}`}
                onChange={(e) => {
                  const [docFN, docLN] = e.target.value.split(" ");
                  setDocFirstName(docFN);
                  setDocLastName(docLN);
                }}
                disabled={!department}
              >
                <option value="">Select Doctor</option>
                {doctors
                  .filter((doctor) => doctor.docDept === department)
                  .map((doctor, index) => (
                    <option
                      value={`${doctor.firstName} ${doctor.lastName}`}
                      key={index}
                    >
                      {doctor.firstName} {doctor.lastName}
                    </option>
                  ))}
              </select>
            </div>
            <div>
              <p>Address</p>
              <input
                type="text"
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
          </div>
          <div>
            <input
              type="checkbox"
              checked={hasVisited}
              onChange={(e) => setHasVisited(e.target.checked)}
            />
            <p>Have you visited before?</p>
          </div>
          <div>
            <button type="submit">Book appointment</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default AppointmentForm;
