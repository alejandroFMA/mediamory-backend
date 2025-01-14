import { Schema, model } from "mongoose";

const FollowSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  followed: { type: Schema.Types.ObjectId, ref: "User", required: true },
  created_at: { type: Date, default: Date.now },
});

const Follow = model("Follow", FollowSchema);

export default Follow;
