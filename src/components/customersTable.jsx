import React from "react";
import { Link } from "react-router-dom";

import Table from "./common/table";
import GoldMemberLogo from "./common/goldMemberLogo";

import auth from "../services/authService";

function CustomersTable({ customers, sortColumn, onSort, onDelete }) {
  const columns = [
    {
      path: "name",
      label: "Name",
      content: (customer) => {
        return <Link to={`/customers/${customer._id}`}>{customer.name}</Link>;
      },
    },
    { path: "phone", label: "Phone Number" },
    {
      path: "isGold",
      label: "Gold Member",
      content: (customer) => {
        if (customer.isGold) return <GoldMemberLogo />;
        return "❌";
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
      data={customers}
      sortColumn={sortColumn}
      onSort={onSort}
    />
  );
}

export default CustomersTable;
