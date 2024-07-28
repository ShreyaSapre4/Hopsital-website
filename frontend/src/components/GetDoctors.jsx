import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../../public/css/components/doctors.scss";

function GetDoctors() {
  const { dept } = useParams();
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

  return (
    <div>
      <div className="doctor-page">
        <h1>Doctors</h1>
        <section className="doctors-grid">
          {doctors
            .filter((doctor) => doctor.docDept === dept)
            .sort((a, b) => b.docRating - a.docRating)
            .map((doc, index) => (
              <div className="card" key={index}>
                <img
                  src={doc.docAvatar && doc.docAvatar.url}
                  alt="doctor avatar"
                />
                <h4>{`${doc.firstName} ${doc.lastName}`}</h4>
                <div className="details">
                  <p>
                    Email: <span>{doc.email}</span>
                  </p>
                  <p>
                    DOB: <span>{doc.dob.substring(0, 10)}</span>
                  </p>
                  <p>
                    Department: <span>{doc.docDept}</span>
                  </p>
                  <p>
                    Gender: <span>{doc.gender}</span>
                  </p>
                  <p>
                    Rating: <span>{doc.docRating}</span>
                  </p>
                </div>
              </div>
            ))}
        </section>
      </div>
    </div>
  );
}

export default GetDoctors;
