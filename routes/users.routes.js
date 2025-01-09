import { Router } from "express";
import {
  createUser,
  getUserById,
  getAllUsers,
  updateUser,
  deleteUser,
  login,
} from "../controllers/users.controller.js";

const router = Router();

router.get("/", getAllUsers);
router.post("/", createUser);
router.post("/login", login);
router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
