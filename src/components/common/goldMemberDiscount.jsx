import React from "react";
import withTooltip from "../hoc/withTooltip";

function GoldMemberDiscount({ price, discountedPrice, showTooltip }) {
  return (
    <div style={{ display: "inline-block" }}>
      <div className="row">
        <strong
          className="col-auto strike"
          style={{ paddingRight: 0, color: "darkRed" }}
        >
          {`$${price}`}
        </strong>
        <strong className="col-auto">{`$${discountedPrice}`}</strong>
      </div>
      {
        <div className="tooltip-container">
          <div className={showTooltip ? "tooltip-box visible" : "tooltip-box"}>
            {"15% Gold Member Discount!"}
            <span className="tooltip-arrow" />
          </div>
        </div>
      }
    </div>
  );
}

export default withTooltip(GoldMemberDiscount);
