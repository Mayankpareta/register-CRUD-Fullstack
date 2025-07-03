import mongoose from "mongoose";

const forgetPasswordSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  token: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 900 // 15 minutes
  }
});

const ForgetPassword = mongoose.model("ForgetPassword",forgetPasswordSchema);
export default ForgetPassword;
