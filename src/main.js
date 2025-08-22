import "dotenv/config";
import express from "express";
import connectDB from "./config/database.js";
import movieRouter from "./routers/movie_router.js";
import commentRouter from "./routers/comment_router.js";
import userRouter from "./routers/user_router.js";

const server = express();
const PORT = process.env.PORT;

server.use(express.json());

connectDB();

server.get("/", (req, res) => {
  res.json({
    message: "Server is running!",
  });
});

server.use("/movies", movieRouter);
server.use("/comments", commentRouter);
server.use("/auth", userRouter);

server.listen(PORT, (req, res) => {
  console.log(`Server is running on port : ${PORT}`);
});
