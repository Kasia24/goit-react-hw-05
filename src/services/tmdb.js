import axios from "axios";

const API_KEY =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMmJlYzQyNzJiZTY2MThkOWEyNTA4YWFiNjg1OWFmMSIsIm5iZiI6MTczMjM3NjE4Ny44NTU4NDkzLCJzdWIiOiI2NzA5NWFkYTI2NWE1ZjhiYzU3MGQ1NzIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.VfY9fBJg_-CChyksB6DwBhoEkYmWI44Fdhpy7TvtgaA";
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

export const getImageUrl = (path, size = "w500") =>
  `https://image.tmdb.org/t/p/${size}${path}`;
