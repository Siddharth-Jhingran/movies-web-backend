import Comment from "../models/comment.js";

export async function getComments(req, res) {
  const movie_id = req.params.movie_id;
  const comments = await Comment.find({ movie_id: movie_id })
    .sort({ createdAt: -1 });
  // Return array format that frontend expects
  res.json(comments);
}

export async function createComment(req, res) {
  const comment = req.body;
  const newComment = await Comment.create(comment);
  // Return comment directly (frontend expects the comment object)
  res.json(newComment);
}

export async function deleteComment(req, res) {
  const id = req.params.id;
  const result = await Comment.findByIdAndDelete(id);
  res.json({
    comment: result,
    message: "Comment deleted successfully",
  });
}
