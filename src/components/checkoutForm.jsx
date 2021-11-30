import React, { useState, useEffect } from "react";

import { getRental } from "../services/rentalService";
import { getMovie } from "../services/movieService";
import { returnRentalById } from "../services/returnService";

import RentalCart from "./rentalCart";
import CustomerDetails from "./customerDetails";

import { toast } from "react-toastify";
import PaymentForm from "./paymentForm";

function CheckoutForm(props) {
  const [rental, setRental] = useState({
    _id: "",
    movie: {},
    customer: { name: "", phone: "" },
    date: "",
  });

  useEffect(() => {
    populateRental();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function populateRental() {
    const { _id: rentalId } = props.match.params;

    const { data: rental } = await getRental(rentalId);
    const { data: movie } = await getMovie(rental.movie._id);
    rental.movie = movie;

    setRental(rental);
  }

  async function doSubmit() {
    try {
      await returnRentalById(rental._id);
      toast.success(
        "Rental Returned Successfully! \n Redirecting you back to the homepage..."
      );
      setTimeout(() => (window.location = "/"), 5000);
    } catch (ex) {
      const { response } = ex;
      if (response) toast.error(`${response.status} - ${response.data}`);
    }
  }

  return (
    <div className="container-80">
      <h2 className="text-center">Checkout</h2>
      <div className="row g5">
        <RentalCart rental={rental} />
        <CustomerDetails customer={rental.customer} />
      </div>
      <hr className="my-4" />
      <PaymentForm rental={rental} doSubmit={doSubmit} />
    </div>
  );
}

export default CheckoutForm;
