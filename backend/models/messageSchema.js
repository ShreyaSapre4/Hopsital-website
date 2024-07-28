import mongoose from "mongoose";
import validator from "validator";

const messageSchema = new mongoose.Schema({
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
        minLength: [10, "Phone number should contain exact 10 digits"],
        maxLength: [10, "Phone number should contain exact 10 digits"]
    },
    message: {
        type: String,
        required: true,
        minLength: [5, "Should contain atleast 5 characters"]
    },
})

export const Message = mongoose.model("Message", messageSchema)