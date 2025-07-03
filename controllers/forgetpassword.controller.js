import jwt from "jsonwebtoken";
//import bcrypt from "bcrypt";
import ForgetPassword from "../models/forgetpassword.model.js";
import User from "../models/user.model.js";

import { forgetPasswordSchema, resetPasswordSchema } from "../validations/forgetPassword.validation.js"

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

export const requestPasswordReset = async (req, res) => {
  const { error } = forgetPasswordSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ error: "User not found" });

  const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "15m" });

  await ForgetPassword.create({ email, token });

  // Simulate sending email
  const resetLink = `http://192.168.0.19:8000/reset-password/${token}`;
console.log("Reset link:", resetLink);

res.status(200).json({
  message: "Password reset link sent",
  token,        // optional
  link: resetLink // ✅ this is what your frontend should use
});
};

export const resetPassword = async (req, res) => {
  const { token } = req.params;

  const { error } = resetPasswordSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    const user = await User.findById(decoded.id);
    if (!user) return res.status(404).json({ error: "User not found" });

    // const hashedPassword = await bcrypt.hash(req.body.newPassword, 10);
    // user.password = hashedPassword;
    // await user.save();
    user.password = req.body.newPassword;
await user.save(); 

    await ForgetPassword.deleteOne({ token });

    res.status(200).json({ message: "Password has been reset successfully" });
  } catch (err) {
    res.status(400).json({ error: "Invalid or expired token" });
  }
};
