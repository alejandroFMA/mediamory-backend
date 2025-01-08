import { Schema, model } from "mongoose";

const UserSchema = new Schema({
  name: { type: String, required: true },
  last_name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  is_admin: { type: Boolean, required: true, default: false },
  created_at: { type: Date, default: Date.now },
});

export const User = model("User", UserSchema);
