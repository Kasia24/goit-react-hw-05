import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieCast } from "../services/tmdb";

const MovieCast = ({ movieId }) => {
  const [cast, setCast] = useState([]);

  useEffect(() => {
    const fetchCast = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=YOUR_API_KEY`
        );
        const data = await response.json();
        setCast(data.cast);
      } catch (error) {
        console.error("Error fetching cast data:", error);
      }
    };

    fetchCast();
  }, [movieId]);

  return (
    <div>
      <h2>Cast</h2>
      <ul>
        {cast.map((actor) => (
          <li key={actor.id}>
            <img
              src={
                actor.profile_path
                  ? `https://image.tmdb.org/t/p/w500${actor.profile_path}`
                  : "https://via.placeholder.com/150" // Zdjęcie zastępcze
              }
              alt={actor.name}
              width="150"
            />
            <p>{actor.name}</p>
            <p>as {actor.character}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieCast;
