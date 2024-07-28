import express from "express"
import { getAllMessages, sendMessage } from "../controller/messageController.js"
import { isAdminAuth } from "../middlewares/auth.js"

const router = express.Router()

router.post("/send", sendMessage)

router.get("/getMessages", isAdminAuth, getAllMessages)

export default router;