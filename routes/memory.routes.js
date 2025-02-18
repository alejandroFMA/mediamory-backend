import { Router } from "express";
import {
  getAllUserMemories,
  getUserMemoryById,
  createUserMemory,
  updateUserMemory,
  deleteUserMemory,
} from "../controllers/memory.controller.js";
import auth from "../middleware/auth.js";

const router = Router();

router.get("all/:id", auth, getAllUserMemories);
router.get("/:id", auth, getUserMemoryById);
router.post("/", auth, createUserMemory);
router.put("/:id", auth, updateUserMemory);
router.delete("/:id", auth, deleteUserMemory);

export default router;
