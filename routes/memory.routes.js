import { Router } from "express";
import {
  getAllUserMemories,
  getUserMemoryById,
  createUserMemory,
  updateUserMemory,
  deleteUserMemory,
} from "../controllers/memory.controller.js";

const router = Router();

router.get("all/:id", getAllUserMemories);
router.get("/:id", getUserMemoryById);
router.post("/", createUserMemory);
router.put("/:id", updateUserMemory);
router.delete("/:id", deleteUserMemory);

export default router;
