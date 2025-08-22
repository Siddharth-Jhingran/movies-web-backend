import express from "express";
import {
  createMovie,
  deleteMovie,
  getMovieById,
  getMovies,
  updateMovie,
} from "../controllers/movie_controller.js";
import { protect } from "../middlewares/auth_middleware.js";
getMovies;

const router = express.Router();

router.use(protect);

router.get("/", getMovies);
router.get("/:id", getMovieById);
router.post("/", createMovie);
router.get("/:id", deleteMovie);
router.put("/:id", updateMovie);

export default router;
