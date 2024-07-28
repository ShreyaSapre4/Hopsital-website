import { User } from "../models/userSchema.js";
import { catchAsyncError } from "./catchAsyncErros.js";
import ErrorHandler from "./errorMiddleware.js";
import jwt from 'jsonwebtoken'

//makes sure the admin is authenticated, won't let the other function in router perform if admin is not authenticated 
export const isAdminAuth = catchAsyncError(async (req, res, next) => {
    const token = req.cookies.adminToken;
    if (!token) {
        return next(new ErrorHandler("Admin not authenticated", 400))
    }
    const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decode.id)

    if (req.user.role !== 'Admin') {
        return next(new ErrorHandler(`${req.user.role} is not authorized for this resource`, 403))
    }
    next()
})

//makes sure the patient is authenticated, won't let the other function in router perform if patient is not authenticated
export const isPatientAuth = catchAsyncError(async (req, res, next) => {
    const token = req.cookies.patientToken;
    if (!token) {
        return next(new ErrorHandler("Patient not authenticated", 400))
    }
    const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decode.id)

    if (req.user.role !== 'Patient') {
        return next(new ErrorHandler(`${req.user.role} is not authorized for this resource`, 403))
    }
    next()
})