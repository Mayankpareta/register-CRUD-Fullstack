import User from "../models/user.model.js";
import Joi from "joi";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
 
export const createUser = async (req, res) => {
 
  try {
 
    const {
      userName,
      full_name,
      email,
      specialist,
      gender,
      phone,
      dob,
      password
    } = req.body;
 
   
    const userValidationSchema = Joi.object({
      userName: Joi.string().trim().min(3).max(30).required(),  
      full_name: Joi.string().trim().min(3).max(50).required(),
      email: Joi.string().email().required(),
      specialist: Joi.array().items(Joi.string().valid("male", "female", "kid")),
      gender: Joi.string().valid("male", "female", "other").required(),
      phone: Joi.string().pattern(/^[0-9]{10}$/).required(),
      dob: Joi.date().iso().required(),
      password: Joi.string().min(6).required()
    });
    const { error } = userValidationSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
 
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "Email already exists" });
    }
 
    const newUser = await User.create({
      userName,
      full_name,
      email,
      specialist,
      gender,
      phone,
      dob,
      password
    });
 
    res.status(201).json({ message: "User created", user: newUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
 
export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
 
export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
 
export const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
 
export const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
 
 
 

export const loginUser = async (req, res) => {
  try {
 
     console.log("r111111eq.user dddddddddddddd ");
 
 
   
    const loginValidationSchema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required()
    });
 
 
    const { error } = loginValidationSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
 
    const { email, password } = req.body;
 
    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
 
  
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
 
    const token = jwt.sign(
      { id: user._id, email: user.email }, // payload
      process.env.JWT_SECRET,              // secret key
      { expiresIn: process.env.JWT_EXPIRES_IN || "7d" } // expiry
    );
 res.status(200).json({
  message: "Login successful",
  token,
  user: {
    id: user._id,
    name: user.full_name,  // <-- Make sure you're sending this!
    email: user.email
  }
});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
 
export const getProfile = async (req, res) => {
  try {
    console.log("r111111eq.user  ", req.user);
 
   
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
 
    res.status(200).json({
      message: "Profile fetched successfully",
      user
    });
  } catch (err) {
    console.log(err);
 
    res.status(500).json({ error: err.message });
  }
};
 