import { Schema, model } from "mongoose";

const MemorySchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  category: { type: String, required: true },
  date: { type: Date, default: Date.now, required: true },
  rating: { type: Number, required: true, min: 0, max: 5 },
  review: { type: String },
  emoji_rating: { type: String },
  tags: { type: [String] },
  created_at: { type: Date, default: Date.now },
});

const Memory = model("Memory", MemorySchema);

export default Memory;
