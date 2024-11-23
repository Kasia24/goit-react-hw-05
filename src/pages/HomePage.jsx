import React, { useState, useEffect } from "react";
import { fetchTrendingMovies } from "../services/tmdb";
import MovieList from "../components/MovieList";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getMovies = async () => {
      setLoading(true);
      try {
        const data = await fetchTrendingMovies();
        setMovies(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    getMovies();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return <MovieList movies={movies} />;
};

export default HomePage;
