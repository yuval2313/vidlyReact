import { apiUrl } from "../config.json";
import http from "./httpService";

const genreEndpoint = apiUrl + "/genres/";

export async function getGenres() {
  const { data: genres } = await http.get(genreEndpoint);
  return genres;
}

export async function getGenre(genreId) {
  const { data: genre } = await http.get(genreEndpoint + genreId);
  return genre;
}
