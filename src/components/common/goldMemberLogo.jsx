import React from "react";
import withTooltip from "../hoc/withTooltip";

function GoldMemberLogo({ showTooltip }) {
  return (
    <div style={{ display: "inline-block" }}>
      <div>{"📀"}</div>
      {
        <div className="tooltip-container">
          <div className={showTooltip ? "tooltip-box visible" : "tooltip-box"}>
            {"Gold Membership"}
            <span className="tooltip-arrow" />
          </div>
        </div>
      }
    </div>
  );
}

export default withTooltip(GoldMemberLogo);
