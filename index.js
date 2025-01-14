import express from "express";
import cors from "cors";
import "./config/db.js";
import userRoutes from "./routes/users.routes.js";
import memoryRoutes from "./routes/memory.routes.js";
import followRoutes from "./routes/follows.routes.js";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/user", userRoutes);
app.use("/api/memory", memoryRoutes);
app.use("/api/follow", followRoutes);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
