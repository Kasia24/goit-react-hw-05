import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Navigation from "./Navigation";

const HomePage = lazy(() => import("../pages/HomePage"));
const MoviesPage = lazy(() => import("../pages/MoviesPage"));
const MovieDetailsPage = lazy(() => import("../pages/MovieDetailsPage"));
const NotFoundPage = lazy(() => import("../pages/NotFoundPage"));
const MovieCast = lazy(() => import("./MovieCast"));
const MovieReviews = lazy(() => import("./MovieReviews"));

const App = () => (
  <>
    <Navigation />
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movies" element={<MoviesPage />} />
        <Route path="/movies/:movieId/*" element={<MovieDetailsPage />}>
          {/* Zagnieżdżone trasy */}
          <Route path="cast" element={<MovieCast />} />
          <Route path="reviews" element={<MovieReviews />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  </>
);

export default App;
