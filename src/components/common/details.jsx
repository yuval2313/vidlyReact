import React from "react";
import _ from "lodash";

function Details({ label, data, details }) {
  const renderDetail = (detail) => {
    if (detail.content) {
      return detail.content(data);
    }

    return _.get(data, detail.path);
  };

  return (
    <div>
      <h4 className="mb-2">{label}</h4>
      <div>
        {details.map((detail) => {
          return (
            <div key={detail.path} className="form-group mb-2">
              <label className="form-label" htmlFor={detail.path}>
                {detail.label}
              </label>
              <div
                key={detail.path}
                id={detail.path}
                name={detail.path}
                className="form-control"
                readOnly
              >
                {renderDetail(detail)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Details;
