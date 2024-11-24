import React, { useState, useEffect } from "react";
import { useParams, Outlet, Link, useLocation } from "react-router-dom";
import { fetchMovieDetails, getImageUrl } from "../services/tmdb";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const location = useLocation();
  const backLink = location.state?.from || "/movies";

  useEffect(() => {
    const getMovie = async () => {
      const data = await fetchMovieDetails(movieId);
      setMovie(data);
    };
    getMovie();
  }, [movieId]);

  if (!movie) return <p>Loading...</p>;

  return (
    <>
      <Link to={backLink}>Go back</Link>
      <h1>{movie.title}</h1>
      <img src={getImageUrl(movie.poster_path)} alt={movie.title} />
      <p>{movie.overview}</p>
      <nav>
        <Link to="cast">Cast</Link>
        <Link to="reviews">Reviews</Link>
      </nav>
      {/* Miejsce na renderowanie zagnieżdżonych komponentów */}
      <Outlet />
    </>
  );
};

export default MovieDetailsPage;
