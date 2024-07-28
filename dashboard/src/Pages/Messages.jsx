import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../main";
import "../../public/css/pages/messages.scss";

function Messages() {
  const [messages, setMessages] = useState([]);
  const { isAuthenticated } = useContext(Context);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/message/getMessages",
          { withCredentials: true }
        );
        setMessages(data.messages);
      } catch (error) {
        console.log(error.response.data.message);
      }
    };
    fetchMessages();
  }, [messages]);

  if (!isAuthenticated) {
    navigate("/login");
  }

  return (
    <>
      <section className="page-messages">
        <h1>MESSAGE</h1>
        <div className="messages">
          {messages && messages.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Message</th>
                </tr>
              </thead>
              <tbody>
                {messages.map((element) => (
                  <tr key={element._id}>
                    <td>{element.firstName}</td>
                    <td>{element.lastName}</td>
                    <td>{element.email}</td>
                    <td>{element.phone}</td>
                    <td>{element.message}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <h1>No Messages!</h1>
          )}
        </div>
      </section>
    </>
  );
}

export default Messages;
