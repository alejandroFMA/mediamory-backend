import { Schema, model } from "mongoose";

const BlacklistSchema = new Schema(
  {
    token: {
      type: String,
      required: true,
      ref: "User",
    },
  },
  { timestamps: true }
);
export default model("Blacklist", BlacklistSchema);
