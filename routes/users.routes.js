import { Router } from "express";
import {
  createUser,
  getUserById,
  getAllUsers,
  updateUser,
  deleteUser,
} from "../controllers/users.controller.js";

const router = Router();

router.post("/register", createUser);
router.get("/", getAllUsers);

router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
