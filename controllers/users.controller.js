import User from "../models/users.model.js";
import { createToken } from "../utils/jwt.js";
import bcrypt from "bcrypt";
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createUser = async (req, res) => {
  const user = req.body;
  user.password = await bcrypt.hash(user.password, 10);
  const newUser = new User(user);
  try {
    const userExists = await User.findOne({
      email: user.email,
      username: user.username,
    });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const existingUser = await User.findOne({
      $or: [{ email: req.body.email }, { username: req.body.username }],
      _id: { $ne: req.params.id },
    });

    if (existingUser) {
      return res.status(400).json({
        status: "error",
        message: "Email or username already exists",
      });
    }

    const userUpdated = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }).select("-password -__v");

    if (!userUpdated) {
      return res
        .status(404)
        .json({ status: "error", message: "User not found" });
    }

    res.status(200).json({
      status: "success",
      message: "User updated successfully",
      user: userUpdated,
    });
  } catch (error) {
    console.error("Update User Error:", error);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    if (!(req.body.email || req.body.username) || !req.body.password) {
      return res
        .status(400)
        .json({ message: "Email or username and password are required" });
    }

    const user = await User.findOne({
      $or: [{ email: req.body.email }, { username: req.body.username }],
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    let pwd = await bcrypt.compare(req.body.password, user.password);

    if (!pwd) {
      return res.status(400).json({
        status: "error",
        message: "Incorrect password",
      });
    }

    const token = createToken(user);

    res.status(200).json({
      message: "User logged in successfully",
      user: { id: user._id, username: user.username },
      token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
