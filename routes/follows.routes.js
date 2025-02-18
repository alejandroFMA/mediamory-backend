import { Router } from "express";
import {
  unfollowUser,
  followers,
  createFollow,
  following,
} from "../controllers/follow.controller.js";
import auth from "../middleware/auth.js";

const router = Router();

router.post("/", auth, createFollow);
router.delete("/", auth, unfollowUser);
router.get("/followers", auth, followers);
router.get("/following", auth, following);

export default router;
