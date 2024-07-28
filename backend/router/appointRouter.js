import express from "express";
import { postAppointment, getAllAppointments, updateAppointments, deleteAppointments, getAppointmentCount } from "../controller/appointmentController.js";
import { isAdminAuth, isPatientAuth } from "../middlewares/auth.js";

const router = express.Router();

router.post("/post", isPatientAuth, postAppointment);

router.get("/allAppointments", isAdminAuth, getAllAppointments);

router.put("/update/:id", isAdminAuth, updateAppointments);

router.delete("/delete/:id", deleteAppointments)

router.get("/appCount", getAppointmentCount)

export default router;