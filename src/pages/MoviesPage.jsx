import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import MovieList from "../components/MovieList";
import axios from "axios";

const API_KEY = "YOUR_API_KEY";

function MoviesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const query = searchParams.get("query") || "";

  useEffect(() => {
    if (!query) return;
    setLoading(true);
    axios
      .get(`https://api.themoviedb.org/3/search/movie`, {
        params: { query },
        headers: { Authorization: `Bearer ${API_KEY}` },
      })
      .then(({ data }) => setMovies(data.results))
      .catch(setError)
      .finally(() => setLoading(false));
  }, [query]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const queryValue = form.elements.query.value.trim();
    setSearchParams({ query: queryValue });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" name="query" defaultValue={query} />
        <button type="submit">Search</button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p>Error fetching movies</p>}
      <MovieList movies={movies} />
    </div>
  );
}

export default MoviesPage;
