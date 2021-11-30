import React, { useContext } from "react";
import RouteContext from "../context/routeContext";
import CustomersContext from "../context/customersContext";

import Select from "./common/select";
import { Link } from "react-router-dom";
import GoldMemberDiscount from "./common/goldMemberDiscount";

function MovieSelect({ movies, data, errors, handleChange }) {
  const { location, match } = useContext(RouteContext);
  const customers = useContext(CustomersContext);

  const details = [
    {
      path: "genre.name",
      label: "Genre",
    },
    {
      path: "dailyRentalRate",
      label: "Daily Rate",
      content: (movie) => {
        const { dailyRentalRate: rate } = movie;
        if (checkGold()) {
          const discountedRate = Math.round(rate * 0.85 * 100) / 100;
          return (
            <GoldMemberDiscount price={rate} discountedPrice={discountedRate} />
          );
        }
        return <strong>{`$${rate}`}</strong>;
      },
    },
  ];

  function checkGold() {
    const customer = customers.filter((c) => c._id === data.customerId)[0];
    if (customer && customer.isGold) {
      return true;
    }
    return false;
  }

  return (
    <div>
      <div className="row" style={{ display: "flex", alignItems: "center" }}>
        <h4 className="col-auto mr-0">Choose a Movie</h4>
        <h4 className="text-muted col-auto px-0">/ Browse - </h4>
        <div className="col-auto">
          <Link
            to={{
              pathname: "/movies",
              state: { from: location, path: match.path, data },
            }}
            className="btn btn-success mb-2"
          >
            Movies
          </Link>
        </div>
      </div>
      <Select
        items={movies}
        data={data}
        errors={errors}
        details={details}
        title="Movie"
        primaryLabel="Title"
        dataValueProperty="movieId"
        textProperty="title"
        handleChange={handleChange}
      />
    </div>
  );
}

export default MovieSelect;
