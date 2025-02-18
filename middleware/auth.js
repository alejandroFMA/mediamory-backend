import jwt from "jsonwebtoken";
import { secret } from "../utils/jwt.js";

const auth = async (req, res, next) => {
  try {
    let token = req.headers.authorization
      ? req.headers.authorization.split(" ")[1]
      : null;

    if (!token) {
      return res
        .status(403)
        .json({ message: "Unauthorized: No token provided" });
    }

    const decoded = jwt.verify(token, secret);

    if (decoded?.exp && decoded.exp <= Date.now() / 1000) {
      return res.status(401).json({ message: "Token expired" });
    }

    req.user = decoded;

    next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Unauthorized: Invalid token or sessionID" });
  }
};

export default auth;
