import User from "../models/users.model.js";
import Blacklist from "../models/blacklist.model.js";
import { createToken } from "../utils/jwt.js";
import bcrypt from "bcrypt";

export const login = async (req, res) => {
  try {
    const { email, username, password } = req.body;

    if ((!email && !username) || !password) {
      return res.status(400).json({
        status: "error",
        message: "Email or username and password are required.",
      });
    }

    const user = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User not found.",
      });
    }

    // Verificar la contraseña
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({
        status: "error",
        message: "Incorrect password",
      });
    }

    const token = createToken(user);

    res.setHeader("Authorization", `Bearer ${token}`);

    return res.status(200).json({
      status: "success",
      message: "User logged in successfully",
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to log in",
    });
  }
};

export const logout = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({
        status: "error",
        message: "Authorization header is required",
      });
    }
    const token = authHeader.split(" ")[1];

    const checkIfBlacklisted = await Blacklist.findOne({ token });

    if (checkIfBlacklisted) {
      return res.status(401).json({
        status: "error",
        message: "User is already logged out",
      });
    }
    const blacklist = new Blacklist({ token: token });
    await blacklist.save();

    res.setHeader("Authorization", "");

    return res.status(200).json({
      status: "success",
      message: "User logged out successfully",
    });
  } catch (error) {
    console.error("Logout Error:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to log out",
    });
  }
};
