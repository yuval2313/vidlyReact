import React, { useContext } from "react";
import RouteContext from "../context/routeContext";

import Select from "./common/select";

import GoldMemberLogo from "./common/goldMemberLogo";
import { Link } from "react-router-dom";

function CustomerSelect({ customers, data, errors, handleChange }) {
  const { location, match } = useContext(RouteContext);

  const details = [
    {
      path: "phone",
      label: "Phone Number",
    },
    {
      path: "isGold",
      label: "Gold Member",
      content: (customer) => {
        if (customer.isGold) return <GoldMemberLogo />;
        return "❌";
      },
    },
  ];

  return (
    <div>
      <div className="row" style={{ display: "flex", alignItems: "center" }}>
        <h4 className="col-auto mr-0">Choose a Customer</h4>
        <h4 className="text-muted col-auto px-0">/ Add a new one - </h4>
        <div className="col-auto">
          <Link
            to={{
              pathname: "/customers/new",
              state: { from: location, path: match.path, data },
            }}
            className="btn btn-success mb-2"
          >
            New Customer
          </Link>
        </div>
      </div>
      <Select
        items={customers}
        data={data}
        errors={errors}
        details={details}
        primaryLabel="Name"
        dataValueProperty="customerId"
        handleChange={handleChange}
      />
    </div>
  );
}

export default CustomerSelect;
