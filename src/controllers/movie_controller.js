import Movie from "../models/movie.js";

export async function getMovies(req, res) {
  const n = req.query.n || 20;
  const q = req.query.q || "";
  const page = req.query.page || 1;

  let query = {};
  if (q) {
    query = {
      $or: [
        { title: { $regex: q, $options: "i" } },
        { plot: { $regex: q, $options: "i" } },
      ],
    };
  }

  const movies = await Movie.find(query)
    .limit(parseInt(n))
    .skip((parseInt(page) - 1) * parseInt(n))
    .sort({ createdAt: -1 });

  const totalMovies = await Movie.countDocuments(query);

  // Return format that frontend expects
  res.json(movies);
}

export async function getTrendingMovies(req, res) {
  try {
    const movies = await Movie.find()
      .limit(20)
      .sort({ createdAt: -1 });

    // Return array format that frontend expects
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: "Error fetching trending movies", error: error.message });
  }
}

export async function getMovieById(req, res) {
  const id = req.params.id;
  const movie = await Movie.findById(id);
  if (!movie) {
    return res.status(404).json({ message: "Movie not found" });
  }
  // Return movie directly (frontend expects the movie object, not wrapped)
  res.json(movie);
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
