import jwt from "jsonwebtoken";

export const secret = process.env.SECRET_JWT;

export const createToken = (user) => {
  const payload = {
    id: user._id,
    name: user.name,
    email: user.email,
    username: user.username,
    is_admin: user.is_admin,
    iat: Math.floor(Date.now() / 1000),
  };

  if (!secret) {
    throw new Error("SECRET_JWT environment variable is not defined");
  }
  try {
    return jwt.sign(payload, secret, {
      algorithm: "HS256",
      expiresIn: "1h",
    });
  } catch (error) {
    console.error("Error creating JWT:", error.message);
    throw new Error("Failed to generate token");
  }
};
