import express from 'express'
import { config } from "dotenv"
import cors from "cors"
import cookieParser from 'cookie-parser'
import fileUpload from 'express-fileupload'
import { dbConnect } from './database/dbConnect.js'
import messageRouter from './router/messageRouter.js'
import { errorMiddleware } from './middlewares/errorMiddleware.js'
import userRouter from './router/userRouter.js'
import appointmentRouter from './router/appointRouter.js'

const app = express()

//using the config.env file to fetch all secretive data
config({ path: "./config/config.env" })

//will enable the express server to respond an OPTION request sent to the server before the actual request is sent, in order to ask which origin and which request options the server accepts
app.use(cors({
    origin: [process.env.FRONTEND_URI, process.env.DASHBOARD_URI],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}))

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "/temp/"
}))

//using routes from different routers like messageRouter, userRouter, appoitnmentRouter
app.use("/api/v1/message", messageRouter)
app.use("/api/v1/user", userRouter)
app.use("/api/v1/appointment", appointmentRouter)

//using middleware made by user
app.use(errorMiddleware)

//connecting to database
dbConnect()

export default app;