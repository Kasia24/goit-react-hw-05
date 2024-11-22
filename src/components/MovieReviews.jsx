import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const API_KEY = "2fd9551be199200f928abc93ae4bceb1";

function MovieReviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/movie/${movieId}/reviews`, {
        headers: { Authorization: `Bearer ${API_KEY}` },
      })
      .then(({ data }) => setReviews(data.results));
  }, [movieId]);

  if (!reviews.length) return <p>No reviews available.</p>;

  return (
    <ul>
      {reviews.map((review) => (
        <li key={review.id}>
          <h3>{review.author}</h3>
          <p>{review.content}</p>
        </li>
      ))}
    </ul>
  );
}

export default MovieReviews;
