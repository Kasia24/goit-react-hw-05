import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const API_KEY = "2fd9551be199200f928abc93ae4bceb1";

function MovieCast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/movie/${movieId}/credits`, {
        headers: { Authorization: `Bearer ${API_KEY}` },
      })
      .then(({ data }) => setCast(data.cast));
  }, [movieId]);

  if (!cast.length) return <p>No cast information available.</p>;

  return (
    <ul>
      {cast.map((actor) => (
        <li key={actor.id}>{actor.name}</li>
      ))}
    </ul>
  );
}

export default MovieCast;
