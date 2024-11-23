import axios from "axios";

const API_KEY = "1c013d8bbb7e802d77994e0ce50e7176";
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const tmdbApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${API_KEY}`,
  },
});

export const fetchTrendingMovies = async () => {
  const response = await tmdbApi.get("/trending/movie/day");
  return response.data.results;
};

export const searchMovies = async (query) => {
  const response = await tmdbApi.get("/search/movie", { params: { query } });
  return response.data.results;
};

export const fetchMovieDetails = async (movieId) => {
  const response = await tmdbApi.get(`/movie/${movieId}`);
  return response.data;
};

export const fetchMovieCast = async (movieId) => {
  const response = await tmdbApi.get(`/movie/${movieId}/credits`);
  return response.data.cast;
};

export const fetchMovieReviews = async (movieId) => {
  const response = await tmdbApi.get(`/movie/${movieId}/reviews`);
  return response.data.results;
};

export const getImageUrl = (path) => `${IMAGE_BASE_URL}${path}`;
