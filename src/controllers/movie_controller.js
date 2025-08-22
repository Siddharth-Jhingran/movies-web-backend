import Movie from "../models/movie.js";

export async function getMovies(req, res) {
  const n = req.query.n || 2;
  const q = req.query.q || "";
  const page = req.query.page || 1;
  const movies = await Movie.find({
    $and: [
      {
        title: { $regex: q, $options: "i" },
      },
      {
        plot: { $regex: q, $options: "i" },
      },
    ],
  })
    .limit(n)
    .skip((page - 1) * n);

  const totalMovies = await Movie.countDocuments();
  res.json({
    total: totalMovies,
    movies: movies,
  });
}

export async function getMovieById(req, res) {
  const id = req.params.id;
  const movie = await Movie.findById(id);
  res.json({
    movie: movie,
  });
}

export async function createMovie(req, res) {
  const { title, poster } = req.body;
  const movie = await Movie.create({ title, poster });
  res.json({
    movie: movie,
    message: "Movie created successfully",
  });
}

export async function deleteMovie(req, res) {
  const id = req.params.id;
  const movie = await Movie.findByIdAndDelete(id);
  res.json({
    movie: movie,
    message: "Movie deleted successfully",
  });
}

export async function updateMovie(req, res) {
  const id = req.params.id;
  const { title, poster } = req.body;
  const movie = await Movie.findByIdAndUpdate(
    id,
    { title, poster },
    { new: true }
  );
  res.json({
    movie: movie,
    message: "Movie updated successfully",
  });
}
