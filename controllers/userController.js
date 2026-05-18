import User from "../models/userSchema.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "9f3d8c1a7b2e4d6f8c0a1b2c3d4e5f6g7h8i9j0k";
const TOKEN_EXPIRES = "24h";

const createToken = (userId) =>
  jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: TOKEN_EXPIRES });

export async function RegisterUser(req, res, next) {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ success: false, message: "Fields are required" });
  }
  if (!validator.isEmail(email)) {
    return res.status(400).json({ success: false, message: "Invalid Email" });
  }
  if (password.length < 8) {
    return res.status(400).json({ success: false, message: "Password must be at least 8 characters" });
  }

  try {
    if (await User.findOne({ email })) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }
    const hashed = await bcrypt.hash(password, 10);
    const newUser = await User.create({ name, email, password: hashed });
    const token = createToken(newUser._id);

    res.status(201).json({
      success: true,
      token,
      user: { id: newUser._id, name: newUser.name, email: newUser.email },
    });
  } catch (error) {
    next(error);
  }
}

export async function LoginUser(req, res, next) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: "Fields are required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: "User not found" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ success: false, message: "Incorrect password" });
    }

    const token = createToken(user._id);
    res.status(200).json({
      success: true,
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    next(error);
  }
}

export async function getCurrentUser(req, res, next) {
  try {
    const user = await User.findById(req.user.id).select("name email");
    if (!user) {
      return res.status(400).json({ success: false, message: "User not found" });
    }
    res.json({ success: true, user });
  } catch (error) {
    next(error);
  }
}

export async function updateProfile(req, res, next) {
  const { name, email } = req.body;

  if (!email || !validator.isEmail(email)) {
    return res.status(400).json({ success: false, message: "Valid email required" });
  }

  try {
    const exists = await User.findOne({ email, _id: { $ne: req.user.id } });
    if (exists) {
      return res.status(400).json({ success: false, message: "Email already exists" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { name, email },
      { new: true, runValidators: true, select: "name email" }
    );

    res.json({ success: true, user: updatedUser });
  } catch (error) {
    next(error);
  }
}

export async function updatePassword(req, res, next) {
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword || newPassword.length < 8) {
    return res.status(400).json({ success: false, message: "Invalid input" });
  }

  try {
    const user = await User.findById(req.user.id).select("password");
    if (!user) {
      return res.status(400).json({ success: false, message: "User not found" });
    }

    const match = await bcrypt.compare(currentPassword, user.password);
    if (!match) {
      return res.status(400).json({ success: false, message: "Password is not correct" });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.json({ success: true, message: "Password changed" });
  } catch (error) {
    next(error);
  }
}