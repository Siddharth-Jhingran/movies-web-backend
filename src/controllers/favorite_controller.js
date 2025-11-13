// Basic favorites controller
// Note: This is a simple implementation. You may want to store favorites in the User model or a separate Favorites collection.

export async function getFavorites(req, res) {
    // For now, return empty array. Frontend will use localStorage as fallback.
    // TODO: Implement proper favorites storage in database
    res.json([]);
}

export async function addFavorite(req, res) {
    const { movieId, movie } = req.body;
    // For now, just return success. Frontend handles storage in localStorage.
    // TODO: Store favorite in database (User model or Favorites collection)
    res.json({ message: "Favorite added (stored locally)", movieId, movie });
}

export async function removeFavorite(req, res) {
    const { movieId } = req.params;
    // For now, just return success. Frontend handles removal from localStorage.
    // TODO: Remove favorite from database
    res.json({ message: "Favorite removed (from local storage)", movieId });
}

