import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const dbUrl = process.env.DB_URL_ATLAS || "mongodb://localhost:27017";

const connectToDatabase = async () => {
  try {
    await mongoose.connect(dbUrl);
    console.log("Connection to MongoDB established");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

connectToDatabase();

export default mongoose;
