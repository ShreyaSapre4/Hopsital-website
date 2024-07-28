import React, { useContext, useEffect, useState } from "react";
import { Context } from "../main";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { TiUserDelete } from "react-icons/ti";
import "../../public/css/pages/doctors.scss";

function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const { isAuthenticated } = useContext(Context);

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchDocs = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/user/doctors",
          { withCredentials: true }
        );
        setDoctors(data.doctors);
      } catch (err) {
        toast.error(err.response.data.message);
      }
    };
    fetchDocs();
  }, [doctors]);

  const deleteDoctor = async (id) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:4000/api/v1/user/doctor/${id}`,
        { withCredentials: true }
      );
      toast.success(data.message);
      setDoctors(...doctors);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const navigate = useNavigate();

  if (!isAuthenticated) {
    navigate("/login");
  }

  return (
    <section className="page-doctors">
      <h1>DOCTORS</h1>
      <div className="grid">
        {doctors && doctors.length > 0 ? (
          doctors.map((element) => {
            return (
              <div className="card">
                <img
                  src={element.docAvatar && element.docAvatar.url}
                  alt="doctor avatar"
                />
                <h4>{`${element.firstName} ${element.lastName}`}</h4>
                <div className="details">
                  <p>
                    Email: <span>{element.email}</span>
                  </p>
                  <p>
                    Phone: <span>{element.phone}</span>
                  </p>
                  <p>
                    DOB: <span>{element.dob.substring(0, 10)}</span>
                  </p>
                  <p>
                    Department: <span>{element.docDept}</span>
                  </p>
                  <p>
                    Gender: <span>{element.gender}</span>
                  </p>
                  <p>
                    <TiUserDelete
                      onClick={() => {
                        deleteDoctor(element._id);
                      }}
                    />
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <h1>No Registered Doctors Found!</h1>
        )}
      </div>
    </section>
  );
}

export default Doctors;
