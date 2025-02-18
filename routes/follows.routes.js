import { Router } from "express";
import {
  unfollowUser,
  followers,
  createFollow,
  following,
} from "../controllers/follow.controller.js";

const router = Router();

router.post("/", createFollow);
router.delete("/", unfollowUser);
router.get("/followers", followers);
router.get("/following", following);

export default router;
