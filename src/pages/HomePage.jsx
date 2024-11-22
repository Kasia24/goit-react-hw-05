import { useEffect, useState } from "react";
import MovieList from "../components/MovieList";
import axios from "axios";

const API_KEY = "2fd9551be199200f928abc93ae4bceb1";

function HomePage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://api.themoviedb.org/3/trending/movie/day", {
        headers: { Authorization: `Bearer ${API_KEY}` },
      })
      .then(({ data }) => setMovies(data.results))
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error fetching movies</p>}
      <MovieList movies={movies} />
    </div>
  );
}

export default HomePage;
