import React from "react";

import Table from "./common/table";
import GoldMemberLogo from "./common/goldMemberLogo";

import auth from "../services/authService";

function RentalsTable({ rentals, sortColumn, onSort, onReturn, onDelete }) {
  const columns = [
    {
      path: "customer.name",
      label: "Customer Name",
      content: (rental) => {
        const { name, isGold } = rental.customer;
        return isGold ? (
          <div className="row">
            <div className="col-auto">{name}</div>
            <div className="col-auto" style={{ paddingLeft: 0 }}>
              <GoldMemberLogo />
            </div>
          </div>
        ) : (
          name
        );
      },
    },
    {
      path: "customer.phone",
      label: "Phone Number",
    },
    {
      path: "movie.title",
      label: "Movie Title",
      content: (rental) => {
        return rental.movie.title;
      },
    },
    {
      path: "date",
      label: "Rental Date",
      content: (rental) => {
        const { date } = rental;
        return `${new Date(date).toLocaleDateString("uk-EN")}`;
      },
    },
    {
      path: "returnDate",
      label: "Return Date",
      content: (rental) => {
        const { returnDate } = rental;

        if (returnDate) {
          return `${new Date(returnDate).toLocaleDateString("uk-EN")}`;
        } else {
          return (
            <button
              className="btn btn-success btn-sm"
              onClick={() => {
                onReturn(rental);
              }}
            >
              Return Rental
            </button>
          );
        }
      },
    },
  ];

  const deleteColumn = {
    key: "delete",
    content: (customer) => (
      <button
        onClick={() => onDelete(customer)}
        className="btn btn-danger btn-sm"
      >
        Delete
      </button>
    ),
  };

  const user = auth.getCurrentUser();
  if (user && user.isAdmin) columns.push(deleteColumn);

  return (
    <Table
      columns={columns}
      data={rentals}
      sortColumn={sortColumn}
      onSort={onSort}
    />
  );
}

export default RentalsTable;
