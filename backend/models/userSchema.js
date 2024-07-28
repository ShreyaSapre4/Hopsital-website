import mongoose from "mongoose";
import validator from "validator";
import bycrypt from "bcrypt"
import jwt from "jsonwebtoken"

const userSchema = new mongoose.Schema({
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
    password: {
        type: String,
        required: true,
        minLength: [6, "Should contain atleast 6 digits"],
        select: false,
    },
    role: {
        type: String,
        required: true,
        enum: ["Admin", "Doctor", "Patient"]
    },
    docDept: {
        type: String,
    },
    docAvatar: {
        public_id: String,
        url: String,
    },
    docRating: {
        type: Number,
        min: 7,
        max: 10,
    }
})

//if password is modified
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next()
    }
    this.password = await bycrypt.hash(this.password, 10);
})

userSchema.pre('save', function (next) {
    if (this.role === 'Doctor' && !this.docRating) {
        this.docRating = (Math.random() * (10 - 7) + 7).toFixed(1);
    }
    next();
});

//checks if passwords match
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bycrypt.compare(enteredPassword, this.password)
}

//generates JSON web tokens and sets expiry for the same
userSchema.methods.generateJWT = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRES
    })
}

export const User = mongoose.model("User", userSchema)