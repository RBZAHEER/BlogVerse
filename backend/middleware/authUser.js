import { User } from "../model/user.model.js";
import jwt from "jsonwebtoken";

//Authentication

export const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    // console.log("middleware - token:", token); // Check if token is present

    if (!token) {
      return res.status(401).json({ error: "User Not Authenticated" });
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
    // console.log("middleware - decoded:", decode); // Check if decoding works

    const user = await User.findById(decode.userId);
    // console.log("middleware - user:", user); // Check if user is found

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log("Authentication Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

//Authorization
export const isAdmin = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ error: `user with given role ${req.user.role} not allowed` });
    }
    next();
  };
};
