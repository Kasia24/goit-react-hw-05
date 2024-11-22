import {
  useParams,
  Link,
  Outlet,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import axios from "axios";

const API_KEY = "2fd9551be199200f928abc93ae4bceb1";

function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const backLinkRef = useRef(location.state?.from || "/movies");

  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/movie/${movieId}`, {
        headers: { Authorization: `Bearer ${API_KEY}` },
      })
      .then(({ data }) => setMovie(data));
  }, [movieId]);

  if (!movie) return <p>Loading...</p>;

  return (
    <div>
      <button onClick={() => navigate(backLinkRef.current)}>Go Back</button>
      <h1>{movie.title}</h1>
      <p>{movie.overview}</p>
      <Link to="cast">Cast</Link>
      <Link to="reviews">Reviews</Link>
      <Outlet />
    </div>
  );
}

export default MovieDetailsPage;
