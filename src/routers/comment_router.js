import express from "express";
import {
  createComment,
  deleteComment,
  getComments,
} from "../controllers/comment_controller.js";
import { protect } from "../middlewares/auth_middleware.js";

const router = express.Router();

router.use(protect);

router.get("/:movie_id", getComments);
router.post("/", createComment);
router.delete("/:id", deleteComment);

export default router;
