import http from "./httpService";

const apiEndpoint = "/rentals";

function rentalUrl(rentalId) {
  return `${apiEndpoint}/${rentalId}`;
}

export function getRentals() {
  return http.get(apiEndpoint);
}

export function getRental(rentalId) {
  return http.get(rentalUrl(rentalId));
}

export function deleteRental(rentalId) {
  return http.delete(rentalUrl(rentalId));
}

export function saveRental(rental) {
  const body = { ...rental };
  delete body._id;

  return http.post(apiEndpoint, body);
}
