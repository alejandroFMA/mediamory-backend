import jwt from "jsonwebtoken";
import { secret } from "../utils/jwt.js";

export const auth = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, secret);

    if (decoded.exp <= Date.now() / 1000) {
      return res.status(401).json({ message: "Token expired" });
    }

    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
  }
};
