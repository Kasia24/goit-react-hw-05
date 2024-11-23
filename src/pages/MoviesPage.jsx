import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { searchMovies } from "../services/tmdb";
import MovieList from "../components/MovieList";

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") || "";

  useEffect(() => {
    if (!query) return;
    const getMovies = async () => {
      const data = await searchMovies(query);
      setMovies(data);
    };
    getMovies();
  }, [query]);

  const handleSearch = (e) => {
    e.preventDefault();
    const query = e.target.elements.query.value.trim();
    setSearchParams({ query });
  };

  return (
    <>
      <form onSubmit={handleSearch}>
        <input name="query" defaultValue={query} />
        <button type="submit">Search</button>
      </form>
      <MovieList movies={movies} />
    </>
  );
};

export default MoviesPage;
