import React from "react";

import Cart from "./common/cart";
import GoldMemberDiscount from "./common/goldMemberDiscount";

import { calculateRentalPrice } from "../utils/calculateRentalPrice";

function RentalCart({ rental }) {
  const cartCells = [
    {
      path: "movie.title",
      label: "Movie Name",
    },
    {
      path: "movie.genre.name",
      label: "Movie Genre",
    },
    {
      path: "movie.dailyRentalRate",
      label: "Daily Rate",
    },
    {
      path: "date",
      label: "Rental Date",
      content: (rental) => {
        const { date } = rental;
        return new Date(date).toLocaleDateString("uk-EN");
      },
    },
    {
      path: "price",
      label: "Total (USD)",
      content: (rental) => {
        const { price, discountedPrice } = calculateRentalPrice(rental);

        if (discountedPrice && price > discountedPrice) {
          return (
            <GoldMemberDiscount
              price={price}
              discountedPrice={discountedPrice}
            />
          );
        }
        return <strong>{`$${price}`}</strong>;
      },
    },
  ];

  return (
    <div className="col-md-5 col-lg-4 order-md-last">
      <Cart
        title="Rental Details"
        badge={new Date().toLocaleDateString("uk-EN")}
        cells={cartCells}
        data={rental}
      />
    </div>
  );
}

export default RentalCart;
