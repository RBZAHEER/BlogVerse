import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoute from "./routes/user.route.js"; // Correct import path
import blogRoute from "./routes/blog.route.js";
import fileUpload from "express-fileupload";
import { v2 as cloudinary } from "cloudinary";
import cors from "cors";
import cookieParser from "cookie-parser";
dotenv.config();
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);
app.use(cookieParser());
app.use(
  cors({
    origin: "https://blog-verse-sandy.vercel.app/",
    credentials: true,
  })
);
// Environment variables
const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL;

// Database connection
const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URL, {});
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
  }
};

connectDB();

// Use user routes
app.use("/api/users", userRoute);
app.use("/api/blogs", blogRoute);

//CLOUDARY SETUP
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_APIKEY,
  api_secret: process.env.CLOUD_APISECRET,
});

// Default route
app.get("/", (req, res) => {
  res.send("Welcome to the main page");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
