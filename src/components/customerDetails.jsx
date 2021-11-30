import React from "react";
import Details from "./common/details";
import GoldMemberLogo from "./common/goldMemberLogo";

function CustomerDetails({ customer }) {
  const details = [
    {
      path: "name",
      label: "Name",
    },
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
    <div className="col-md-7 col-lg-8">
      <Details label="Customer Detials" data={customer} details={details} />
    </div>
  );
}

export default CustomerDetails;
