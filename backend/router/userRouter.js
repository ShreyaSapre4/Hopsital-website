import express from "express"
import { adminRegister, deleteDoctor, doctorCount, doctorRegister, getAllDoctors, getUserInfo, login, logoutAdmin, logoutPatient, patientRegister } from "../controller/userController.js";
import { isAdminAuth, isPatientAuth } from "../middlewares/auth.js";

const router = express.Router()

router.post("/patient/register", patientRegister)
router.post("/login", login)
router.post("/admin/register", isAdminAuth, adminRegister)
router.post("/doctor/register", isAdminAuth, doctorRegister)

router.get("/doctors", getAllDoctors)
router.get("/docCount", doctorCount)
router.get("/admin/me", isAdminAuth, getUserInfo)
router.get("/patient/me", isPatientAuth, getUserInfo)
router.get("/admin/logout", isAdminAuth, logoutAdmin)
router.get("/patient/logout", isPatientAuth, logoutPatient)

router.delete("/doctor/:id", isAdminAuth, deleteDoctor)

export default router;