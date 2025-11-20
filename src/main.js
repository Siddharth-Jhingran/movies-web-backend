import "dotenv/config";
import express from "express";
import connectDB from "./config/database.js";
import movieRouter from "./routers/movie_router.js";
import commentRouter from "./routers/comment_router.js";
import userRouter from "./routers/user_router.js";
import favoriteRouter from "./routers/favorite_router.js";
import cors from "cors";

const server = express();
const PORT = process.env.PORT || 3000;

// Middleware
server.use(express.json());

// CORS configuration - allow frontend requests
const allowedOrigins = [
  "https://movix-teb2.onrender.com",
  "https://movi-x-flame.vercel.app",
  "http://localhost:5173", // Vite default port
  "http://localhost:5174", // Alternative Vite port
  "http://localhost:3000",
];

// Single CORS middleware that checks the allowedOrigins array.
server.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) !== -1) {
        return callback(null, true);
      }
      // Not allowed
      return callback(new Error("Not allowed by CORS"));
    },
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  })
);

// Connect to database
connectDB();

// Routes
server.get("/", (req, res) => {
  res.json({
    message: "Server is running!",
  });
});

server.get("/api/test", (req, res) => {
  res.json({ message: "Backend connected successfully!" });
});

server.use("/movies", movieRouter);
server.use("/comments", commentRouter);
server.use("/auth", userRouter);
server.use("/api/favorites", favoriteRouter);

// Start server
server.listen(PORT, () => {
  console.log(`Server is running on port : ${PORT}`);
});
