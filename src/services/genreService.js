import http from "./httpService";

const apiEndpoint = "/genres";

function genreUrl(genreId) {
  return `${apiEndpoint}/${genreId}`;
}

export function getGenres() {
  return http.get(apiEndpoint);
}

export function getGenre(genreId) {
  return http.get(genreUrl(genreId));
}
