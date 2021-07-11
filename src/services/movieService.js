import { apiUrl } from "../config.json";
import http from "./httpService";

const moviesEndpoint = apiUrl + "/movies/";

export async function getMovies() {
  const { data: dbMovies } = await http.get(moviesEndpoint);
  return dbMovies;
}

export async function getMovie(movieId) {
  const { data: dbMovie } = await http.get(moviesEndpoint + movieId);
  return dbMovie;
}

export async function deleteMovie(movieId) {
  const { data: dbMovie } = await http.delete(moviesEndpoint + movieId);
  return dbMovie;
}

export async function saveMovie(movie) {
  const body = { ...movie };
  delete body._id;

  if (movie._id) {
    const { data: dbMovie } = await http.put(moviesEndpoint + movie._id, body);
    return dbMovie;
  }
  const { data: dbMovie } = await http.post(moviesEndpoint, body);
  return dbMovie;
}

export function mapToViewModel(movie) {
  return {
    _id: movie._id,
    title: movie.title,
    genreId: movie.genre._id,
    numberInStock: movie.numberInStock,
    dailyRentalRate: movie.dailyRentalRate,
    liked: movie.liked ? movie.liked : false,
  };
}
