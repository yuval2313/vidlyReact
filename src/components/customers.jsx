import React, { useState, useEffect, useCallback, useRef } from "react";
import { Link } from "react-router-dom";

import SearchBox from "./common/searchBox";
import CustomersTable from "./customersTable";
import Pagination from "./common/pagination";

import { getCustomers, deleteCustomer } from "./../services/customerService";
import { paginationUtilities } from "../utils/paginationUtils";

function Customers() {
  const [customers, setCustomers] = useState([{}, {}]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortColumn, setSortColumn] = useState({ path: "name", order: "asc" });
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(4);

  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      populateCustomers();
    } else {
      handlePageOverCount();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, customers]);

  const populateCustomers = useCallback(async () => {
    const { data: customers } = await getCustomers();
    setCustomers(customers);
  }, []);

  const searchQueries = [{ path: "name", search: searchQuery }];
  const { handleSearch, handleDelete, getPagedData, handlePageOverCount } =
    paginationUtilities(
      customers,
      currentPage,
      pageSize,
      searchQueries,
      sortColumn,
      setCustomers,
      setCurrentPage,
      deleteCustomer
    );

  const { totalCount, pagedItems: pagedCustomers } = getPagedData();

  return (
    <div>
      <Link
        to="/customers/new"
        className="btn btn-primary"
        style={{ marginBottom: 10 }}
      >
        Add New Customer
      </Link>
      <SearchBox
        value={searchQuery}
        onChange={handleSearch(setSearchQuery)}
        description={"Filter by customer name"}
        placeholder="Search..."
        inputStyle={{ width: "500px" }}
      />
      <CustomersTable
        customers={pagedCustomers}
        sortColumn={sortColumn}
        onSort={setSortColumn}
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

export default Customers;
