import http from "./httpService";

const apiEndpoint = "/returns";

function rentalUrl(rentalId) {
  return `${apiEndpoint}/${rentalId}`;
}

function mapRental(rental) {
  return {
    customerId: rental.customerId._id,
    movieId: rental.movieId._id,
  };
}

export function returnRental(rental) {
  const body = mapRental(rental);
  return http.post(apiEndpoint, body);
}

export function returnRentalById(rentalId) {
  return http.post(rentalUrl(rentalId));
}
