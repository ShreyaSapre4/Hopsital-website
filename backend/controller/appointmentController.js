import { catchAsyncError } from "../middlewares/catchAsyncErros.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import { Appointment } from "../models/appointmentSchema.js";
import { User } from "../models/userSchema.js";


export const postAppointment = catchAsyncError(async (req, res, next) => {
    const {
        firstName,
        lastName,
        email,
        phone,
        dob,
        gender,
        appointment_date,
        department,
        doctor_firstName,
        doctor_lastName,
        hasVisited,
        address,
    } = req.body;
    
    if (
        !firstName ||
        !lastName ||
        !email ||
        !phone ||
        !dob ||
        !gender ||
        !appointment_date ||
        !department ||
        !doctor_firstName ||
        !doctor_lastName ||
        !address
    ) {
        return next(new ErrorHandler("Please Fill Full Form!", 400));
    }

    const conflict = await User.find({
        firstName: doctor_firstName,
        lastName: doctor_lastName,
        role: "Doctor",
        docDept: department,
    });

    if (conflict.length === 0) {
        return next(new ErrorHandler("Doctor not found", 400));
    }

    if (conflict.length > 1) {
        return next(
            new ErrorHandler(
                "Doctor's conflict, please contact through email or phone",
                400
            )
        );
    }
    const doctor_id = conflict[0]._id;
    const patient_id = req.user._id;

    const newAppointment = await Appointment.create({
        firstName,
        lastName,
        email,
        phone,
        dob,
        gender,
        appointment_date,
        department,
        doctor_id,
        patient_id,
        hasVisited,
        address,
        doctor: { doctor_firstName, doctor_lastName },
    });

    res.status(200).json({
        success: true,
        message: "Appointment made successfully",
    })
});


export const getAllAppointments = catchAsyncError(async (req, res, next) => {
    const appointments = await Appointment.find()
    res.status(200).json({
        success: true,
        appointments
    })
})

export const updateAppointments = catchAsyncError(async (req, res, next) => {
    const { id } = req.params;
    let appointment = await Appointment.findById(id)
    if (!appointment) {
        return next(new ErrorHandler("Appointment not found", 400))
    }

    appointment = await Appointment.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true,
        message: "Appointment updated successfully",
        appointment
    })
})

export const deleteAppointments = catchAsyncError(async (req, res, next) => {
    const { id } = req.params;
    let appointment = await Appointment.findById(id)
    if (!appointment) {
        return next(new ErrorHandler("Appointment doesn't exist", 400))
    }
    await appointment.deleteOne()
    res.status(200).json({
        success: true,
        message: "Appointment deleted!",
    })
})

export const getAppointmentCount = catchAsyncError(async (req, res, next)=>{
    const appCount = await Appointment.countDocuments({})

    res.status(200).json({
        success: true,
        appCount
    })
})
