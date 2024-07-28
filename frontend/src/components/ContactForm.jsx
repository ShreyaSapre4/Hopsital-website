import axios from "axios";
import React, { useState } from "react";
import { json } from "react-router-dom";
import { toast } from "react-toastify";
import "../../public/css/components/contactForm.scss";

function ContactForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const handleMessage = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post(
          "http://localhost:4000/api/v1/message/send",
          { firstName, lastName, email, phone, message },
          {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
          }
        )
        .then((res) => {
          toast.success(res.data.message);
          setFirstName("");
          setLastName("");
          setEmail("");
          setPhone("");
          setMessage("");
        });
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };
  return (
    <div className="contact-form">
      <form onSubmit={handleMessage}>
        <h1>Contact form</h1>
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
            value={email}
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
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
          <textarea
            rows={7}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Message"
          ></textarea>
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default ContactForm;
