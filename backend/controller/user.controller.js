import { User } from "../model/user.model.js";
import { v2 as cloudinary } from "cloudinary";
import bcrypt from "bcrypt";
import { createTokenAndSaveCookies } from "../jwt/AuthToken.js";

// user.controller.js
export const register = async (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({ message: "User Photo is not uploaded" });
  }
  const { photo } = await req.files;
  const allowedFormat = ["image/jpg", "image/png", "image/jpeg"];
  if (!allowedFormat.includes(photo.mimetype)) {
    return res
      .status(400)
      .json({ message: "Only jpg , jpeg & png are allowed" });
  }
  const { name, email, password, phone, role, education } = req.body;

  //Check all required feilds
  if (!name || !email || !password || !phone || !role || !education || !photo) {
    return res.status(400).json({ message: "All feilds are required" });
  }

  const user = await User.findOne({ email });
  if (user) {
    return res.status(400).json({ message: "User already registered" });
  }

  const cloudinaryResponse = await cloudinary.uploader.upload(
    photo.tempFilePath
  );

  if (!cloudinaryResponse || cloudinaryResponse.error) {
    console.log(cloudinaryResponse.error);
  }
  let hashPassword = await bcrypt.hash(password, 10);
  const newUser = new User({
    email,
    password: hashPassword,
    name,
    phone,
    role,
    education,
    photo: {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.url,
    },
  });
  await newUser.save();
  if (newUser) {
    await createTokenAndSaveCookies(newUser._id, res);
    res.status(201).json({ message: "User registered successfully" });
  }
};

//Login
export const login = async (req, res) => {
  const { email, password, role } = req.body;
  try {
    if (!email || !password || !role) {
      return res.status(400).json({ message: "All feild are Required" });
    }
    const user = await User.findOne({ email }).select("+password");
    console.log(user.name);
    if (!user.password) {
      return res.status(400).json({ message: "user Password is missing" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "invalid email or password" });
    }
    if (user.role !== role) {
      return res
        .status(400)
        .json({ message: `given role:${role} is not valid` });
    }

    //token
    const token = createTokenAndSaveCookies(user._id, res);
    return res.status(200).json({ message: "User logged in successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

//Logout
export const logout = async (req, res) => {
  try {
    res.clearCookie("jwt");
    res.status(200).json({ message: "User logged out Successfully" });
  } catch (error) {
    console.log(error);
  }
};

//GetMyProfile
export const getMyProfile = async (req, res) => {
  const user = req.user;

  // If user is not found, return a 404 response and stop further execution
  if (!user) {
    return res.status(404).json({ error: "User Not Found" });
  }

  // If user is found, return a 200 response with the user data
  return res.status(200).json({ user });
};

//getAdmins
export const getAdmins = async (req, res) => {
  const admins = await User.find({ role: "admin" });
  if (!admins) {
    return res.status(404).json({ error: "Admin Not Found" });
  }
  res.status(200).json({ admins });
};
