import React, { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";

import { getRentals, deleteRental } from "../services/rentalService";
import { paginationUtilities } from "../utils/paginationUtils";

import SearchBox from "./common/searchBox";
import CheckBox from "./common/checkBox";
import Pagination from "./common/pagination";
import RentalsTable from "./rentalsTable";

function Rentals() {
  const [rentals, setRentals] = useState([]);
  const [movieSearchQuery, setMovieSearchQuery] = useState("");
  const [customerSearchQuery, setCustomerSearchQuery] = useState("");
  const [showReturned, setShowReturned] = useState(false);
  const [sortColumn, setSortColumn] = useState({
    path: "customer.name",
    order: "asc",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(4);

  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      populateRentals();
    } else {
      handlePageOverCount();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, rentals]);

  const populateRentals = useCallback(async () => {
    const { data: rentals } = await getRentals();
    setRentals(rentals);
  }, []);

  async function handleReturn(rental) {
    window.location = `/returns/${rental._id}`;
  }

  const searchQueries = [
    { path: "customer.name", search: customerSearchQuery },
    { path: "movie.title", search: movieSearchQuery },
  ];
  const { handlePageOverCount, handleSearch, handleDelete, getPagedData } =
    paginationUtilities(
      rentals,
      currentPage,
      pageSize,
      searchQueries,
      sortColumn,
      setRentals,
      setCurrentPage,
      deleteRental
    );

  function withReturnedRentals(getPagedData) {
    const withReturnedRentals = showReturned
      ? rentals
      : rentals.filter((r) => !r.returnDate);

    return getPagedData(withReturnedRentals);
  }

  const { totalCount, pagedItems: pagedRentals } =
    withReturnedRentals(getPagedData);

  return (
    <div>
      <Link to="/rentals/new" className="btn btn-primary mb-3">
        Add New Rental
      </Link>
      <SearchBox
        value={customerSearchQuery}
        onChange={handleSearch(setCustomerSearchQuery)}
        name={"filterByCustomer"}
        label={"By Customer"}
        description={"Filter by customer name"}
        labelStyle={{ width: "90px" }}
      />
      <SearchBox
        value={movieSearchQuery}
        onChange={handleSearch(setMovieSearchQuery)}
        name={"filterByMovie"}
        label={"By Movie"}
        description={"Filter by movie title"}
        labelStyle={{ width: "90px" }}
      />
      <CheckBox
        name="showReturned"
        value={showReturned}
        onChange={() => setShowReturned(!showReturned)}
        label="Show Returned"
      />
      <RentalsTable
        rentals={pagedRentals}
        sortColumn={sortColumn}
        onSort={setSortColumn}
        onReturn={handleReturn}
        onDelete={handleDelete}
      />
      <Pagination
        itemCount={totalCount}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}

export default Rentals;
