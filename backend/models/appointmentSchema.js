import mongoose from "mongoose";
import validator from "validator";

const appointmentSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: [3, "First name should contain atleast 3 characters"]
    },
    lastName: {
        type: String,
        required: true,
        minLength: [3, "First name should contain atleast 3 characters"]
    },
    email: {
        type: String,
        required: true,
        validate: [validator.isEmail, "Please provide valid email"]
    },
    phone: {
        type: String,
        required: true,
        minLength: [10, "Should contain exact 10 digits"],
        maxLength: [10, "Should contain exact 10 digits"]
    },
    dob: {
        type: Date,
        required: [true, "Date of birth is required"]
    },
    gender: {
        type: String,
        required: true,
        enum: ["male", "female"]
    },
    appointment_date: {
        type: String,
        required: [true, "Appointment date is required"],
    },
    department: {
        type: String,
        required: [true, "Department Name Is Required!"],
    },
    doctor: {
        doctor_firstName: {
            type: String,
            required: [true, "Doctor Name Is Required!"],
        },
        doctor_lastName: {
            type: String,
            required: [true, "Doctor Name Is Required!"],
        },
    },
    hasVisited: {
        type: Boolean,
        default: false,
    },
    address: {
        type: String,
        required: [true, "Address is Required!"],
    },
    doctor_id: {
        type: mongoose.Schema.ObjectId,
        required: [true, "Doctor ID is Invalid!"],
    },
    patient_id: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: [true, "Patient ID is Required!"],
    },
    status: {
        type: String,
        enum: ["Pending", "Accepted", "Rejected"],
        default: "Pending",
    },
})

export const Appointment = mongoose.model("Appointment", appointmentSchema);