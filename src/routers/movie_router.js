import express from "express";
import {
  createMovie,
  deleteMovie,
  getMovieById,
  getMovies,
  getTrendingMovies,
  updateMovie,
} from "../controllers/movie_controller.js";
import { protect } from "../middlewares/auth_middleware.js";

const router = express.Router();

router.use(protect);

// Trending movies endpoint (must be before /:id route)
router.get("/trending", getTrendingMovies);
router.get("/", getMovies);
router.get("/:id", getMovieById);
router.post("/", createMovie);
router.delete("/:id", deleteMovie);
router.put("/:id", updateMovie);

export default router;
