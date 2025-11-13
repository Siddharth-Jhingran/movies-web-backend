import express from "express";
import {
    getFavorites,
    addFavorite,
    removeFavorite,
} from "../controllers/favorite_controller.js";
import { protect } from "../middlewares/auth_middleware.js";

const router = express.Router();

router.use(protect);

router.get("/", getFavorites);
router.post("/add", addFavorite);
router.delete("/:movieId", removeFavorite);

export default router;

