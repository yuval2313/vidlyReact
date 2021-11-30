export function calculateRentalPrice(rental) {
  const { date, customer, movie } = rental;
  const returnDate = Date.now();

  let daysPassed = Math.round(
    (returnDate - new Date(date).getTime()) / 86400000
  );

  if (daysPassed === 0) daysPassed = 1;

  const price = Math.round(movie.dailyRentalRate * daysPassed);
  const discountedPrice = Math.round(price * 0.85);

  if (customer.isGold) {
    return { price, discountedPrice };
  }

  return { price, discountedPrice: false };
}
