import React, { useContext, useEffect, useState } from "react";
import { Context } from "../main";
import axios from "axios";
import { toast } from "react-toastify";
import { GoCheckCircleFill } from "react-icons/go";
import { AiFillCloseCircle } from "react-icons/ai";
import "../../public/css/pages/dashboard.scss";
import { useNavigate } from "react-router-dom";
import { BiTrash } from "react-icons/bi";

function Dashboard() {
  const { isAuthenticated, admin } = useContext(Context);
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [appointmentsCount, setAppointmentsCount] = useState();
  const [doctorCount, setDoctorCount] = useState();

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/appointment/allAppointments",
          { withCredentials: true }
        );
        setAppointments(data.appointments);
      } catch (error) {
        console.log("Error fetching appointments");
        setAppointments([]);
      }
    };
    fetchAppointments();
  }, [appointments]);

  useEffect(() => {
    const appointmentCount = async () => {
      try {
        const appointmentCount = await axios.get(
          "http://localhost:4000/api/v1/appointment/appCount"
        );
        setAppointmentsCount(appointmentCount.data.appCount);
        console.log(appointmentCount.data.appCount);
      } catch (error) {
        console.log("Error in getting count");
      }
    };

    appointmentCount();
  }, [appointmentsCount]);

  useEffect(() => {
    const docCount = async () => {
      try {
        const doctorsCount = await axios.get(
          "http://localhost:4000/api/v1/user/docCount"
        );
        setDoctorCount(doctorsCount.data.docCount);
      } catch (error) {
        console.log("Error in getting count");
      }
    };

    docCount();
  }, [doctorCount]);

  const updateAppointment = async (appointmentID, status) => {
    try {
      const { data } = await axios.put(
        `http://localhost:4000/api/v1/appointment/update/${appointmentID}`,
        { status },
        { withCredentials: true }
      );
      setAppointments((prevApp) =>
        prevApp.map((app) =>
          app._id === appointmentID ? { ...app, status } : app
        )
      );
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const deleteAppointment = async (app_ID) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:4000/api/v1/appointment/delete/${app_ID}`
      );
      toast.success(data.message);
      setAppointments(...appointments);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  if (!isAuthenticated) {
    navigate("/login");
  }
  
  return (
    <div>
      <section className="dashboard-page">
        <div className="banner">
          <div className="firstBox">
            <div className="content">
              <div>
                <p>Welcome</p>
              </div>
              <p>
                Here, you can efficiently manage all aspects of your platform.
                Track and oversee appointments, monitor registered doctors, and
                stay updated on the latest activities and statistics
              </p>
            </div>
          </div>
          <div className="secondBox">
            <p>Total Appointments</p>
            <h3>{appointmentsCount}</h3>
          </div>
          <div className="thirdBox">
            <p>Registered Doctors</p>
            <h3>{doctorCount}</h3>
          </div>
        </div>
        <div className="appointments">
          <h5>Appointments</h5>
          <table>
            <tr>
              <th>Patient</th>
              <th>Date</th>
              <th>Doctor</th>
              <th>Department</th>
              <th>Status</th>
              <th>Visited</th>
              <th>Delete</th>
            </tr>
            {appointments && appointments.length > 0
              ? appointments.map((appointment) => (
                  <tr key={appointment._id}>
                    <td>{`${appointment.firstName} ${appointment.lastName}`}</td>
                    <td>{appointment.appointment_date.substring(0, 16)}</td>
                    <td>{`${appointment.doctor.doctor_firstName} ${appointment.doctor.doctor_lastName}`}</td>
                    <td>{appointment.department}</td>
                    <td>
                      <select
                        className={
                          appointment.status === "Pending"
                            ? "value-pending"
                            : appointment.status === "Accepted"
                            ? "value-accepted"
                            : "value-rejected"
                        }
                        value={appointment.status}
                        onChange={(e) =>
                          updateAppointment(appointment._id, e.target.value)
                        }
                      >
                        <option value="Pending" className="value-pending">
                          Pending
                        </option>
                        <option value="Accepted" className="value-accepted">
                          Accepted
                        </option>
                        <option value="Rejected" className="value-rejected">
                          Rejected
                        </option>
                      </select>
                    </td>
                    <td>
                      {appointment.hasVisited === true ? (
                        <GoCheckCircleFill className="green" />
                      ) : (
                        <AiFillCloseCircle className="red" />
                      )}
                    </td>
                    <td>
                      <BiTrash
                        className="red"
                        onClick={() => {
                          deleteAppointment(appointment._id);
                        }}
                      />
                    </td>
                  </tr>
                ))
              : "No Appointments Found!"}
          </table>
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
