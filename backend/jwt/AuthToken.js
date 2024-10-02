import jwt from "jsonwebtoken";
import { User } from "../model/user.model.js";

export const createTokenAndSaveCookies = async (userId, res) => {
  if (!process.env.JWT_SECRET_KEY) {
    throw new Error(
      "JWT_SECRET_KEY is not defined in the environment variables"
    );
  }

  let token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, {
    expiresIn: "30d",
  });

  // Set the token in cookies
  res.cookie("jwt", token, {
    httpOnly: true, // Ensures the cookie is only accessible by the web server
    secure: false, // Should be true in production when using HTTPS
    sameSite: "lax", // Adjust if necessary
    path: "/",
  });

  await User.findByIdAndUpdate(userId, { token });
  return token;
};
