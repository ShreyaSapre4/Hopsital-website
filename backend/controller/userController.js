import { catchAsyncError } from "../middlewares/catchAsyncErros.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import { User } from "../models/userSchema.js";
import { generateToken } from "../utils/jwtTokens.js";
import cloudinary from "cloudinary";

export const patientRegister = catchAsyncError(async (req, res, next) => {
  const { firstName, lastName, email, phone, dob, gender, password, role } =
    req.body;

  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !dob ||
    !gender ||
    !password ||
    !role
  ) {
    return next(new ErrorHandler("Fill the form fully", 400));
  }

  let user = await User.findOne({ email });

  if (user) {
    return next(new ErrorHandler("User already registered", 400));
  }

  user = await User.create({
    firstName,
    lastName,
    email,
    phone,
    dob,
    gender,
    password,
    role,
  });

  generateToken(user, "User registered!", 200, res);
});

export const login = catchAsyncError(async (req, res, next) => {
  const { email, password, role } = req.body;

  if (!email || !password || !role) {
    return next(new ErrorHandler("Please provide all details", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(
      new ErrorHandler(
        "Invalid details, please try again with valid email or passsword",
        400
      )
    );
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return next(new ErrorHandler("Invalid passsword", 400));
  }

  if (role !== user.role) {
    return next(new ErrorHandler("User with this role not found", 400));
  }

  generateToken(user, "User logged in succesfully!", 200, res);
});

export const adminRegister = catchAsyncError(async (req, res, next) => {
  const { firstName, lastName, email, phone, dob, gender, password } = req.body;

  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !dob ||
    !gender ||
    !password
  ) {
    return next(new ErrorHandler("Fill the form fully", 400));
  }

  let isRegistered = await User.findOne({ email });

  if (isRegistered) {
    return next(
      new ErrorHandler(`${isRegistered.role} already registered`, 400)
    );
  }

  const admin = await User.create({
    firstName,
    lastName,
    email,
    phone,
    dob,
    gender,
    password,
    role: "Admin",
  });

  res.status(200).json({
    success: true,
    message: "New Admin registered succesfully!",
  });
});

export const getAllDoctors = catchAsyncError(async (req, res, next) => {
  const doctors = await User.find({ role: "Doctor" });
  res.status(200).json({
    success: true,
    doctors,
  });
});

export const getUserInfo = catchAsyncError(async (req, res, next) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    user,
  });
});

export const logoutAdmin = catchAsyncError(async (req, res, next) => {
  res
    .status(200)
    .cookie("adminToken", "", {
      httpOnly: true,
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "Admin logged out successfully",
    });
});

export const logoutPatient = catchAsyncError(async (req, res, next) => {
  res
    .status(200)
    .cookie("patientToken", "", {
      httpOnly: true,
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "User logged out succesfully",
    });
});

export const doctorRegister = catchAsyncError(async (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new ErrorHandler("Doctor photo required", 400));
  }
  const { docAvatar } = req.files;
  const allowedFormat = ["image/png", "image/jpeg", "image/webp"];

  if (!allowedFormat.includes(docAvatar.mimetype)) {
    return next(new ErrorHandler("File format not supported", 400));
  }

  const { firstName, lastName, email, phone, dob, gender, password, docDept } =
    req.body;

  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !dob ||
    !gender ||
    !password ||
    !docDept ||
    !docAvatar
  ) {
    return next(new ErrorHandler("Provide full details", 400));
  }

  const isRegistered = await User.findOne({ email });
  if (isRegistered) {
    return next(
      new ErrorHandler(
        `${isRegistered.role} already registered with this email`,
        400
      )
    );
  }

  const cloudinaryResponse = await cloudinary.uploader.upload(
    docAvatar.tempFilePath
  );
  if (!cloudinaryResponse || cloudinaryResponse.error) {
    console.error(
      "Cloudinary error: ",
      cloudinaryResponse.error || "Unknown cloudinary error"
    );
  }

  const doctor = await User.create({
    firstName,
    lastName,
    email,
    phone,
    dob,
    gender,
    password,
    docDept,
    role: "Doctor",
    docAvatar: {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    },
  });

  res.status(200).json({
    success: true,
    message: "New doctor Registered!",
    doctor,
  });
});

export const doctorCount = catchAsyncError(async (req, res, next) => {
  const docCount = await User.countDocuments({ role: 'Doctor' })

  res.status(200).json({
    success: true,
    docCount
  })
})

export const deleteDoctor = catchAsyncError(async(req,res,next)=>{
  const {id} = req.params;
  let doctor = await User.findById(id)

  if(!doctor){
    return next(new ErrorHandler("Doctor does not exist"))
  }

  await doctor.deleteOne()
  res.status(200).json({
    success: true,
    message: "Doctor unregistered!"
  })
})
