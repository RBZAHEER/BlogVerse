import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [validator.isEmail, "Please enter a valid Email"],
  },
  password: {
    type: String,
    required: true,
    select: false,
  },

  phone: {
    type: Number,
    required: true,
    unique: true,
  },

  role: {
    type: String,
    requierd: true,
    enum: ["user", "admin"],
  },
  education: {
    type: String,
    requierd: true,
  },
  photo: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  token: {
    type: String,
  },
  createdAt: {
    type: Date,
    dafault: Date.now,
  },
});

export const User = mongoose.model("User", userSchema);
