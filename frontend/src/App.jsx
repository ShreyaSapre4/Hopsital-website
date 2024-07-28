import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Appointment from "./pages/Appointment";
import Register from "./pages/Register";
import Login from "./pages/Login";
import About from "./pages/About";
import { ToastContainer } from "react-toastify";
import Contact from "./pages/Contact";
import { useContext, useEffect } from "react";
import { Context } from "./main";
import Doctors from "./pages/Doctors";

function App() {
  const { authenticated, setAuthenticated, setUser } = useContext(Context);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const responsse = await axios.get(
          "http://localhost:4000/api/v1/user/patient/me",
          { withCredentials: true }
        );
        setAuthenticated(true);
        setUser(responsse.data.user);
      } catch (err) {
        setAuthenticated(false);
        setUser({});
      }
    };

    fetchUser();
  }, []);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/appointment" element={<Appointment />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path ='/:dept' element={<Doctors />} />
        </Routes>
        <ToastContainer position="bottom-right" />
      </BrowserRouter>
    </>
  );
}

export default App;
