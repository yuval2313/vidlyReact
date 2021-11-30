import React from "react";
import _ from "lodash";

function Cart({ title, badge, cells, data }) {
  function getValue(item) {
    if (item.content) {
      return item.content(data);
    }

    return _.get(data, item.path);
  }
  return (
    <div>
      <h4 className="d-flex justify-content-between align-items-center mb-3">
        <span className="text-primary-black">{title}</span>
        <span className="badge bg-primary rounded-pill">{badge}</span>
      </h4>

      <ul className="list-group mb-3">
        {cells.map((item, i, arr) => {
          let backgroundColor = "#E9ECEF";
          if (arr.length - 1 === i) {
            backgroundColor = "";
          }
          return (
            <li
              key={item.label}
              className="list-group-item d-flex justify-content-between lh-sm"
              style={{ backgroundColor, borderColor: "darkgray" }}
            >
              <div>
                <h6 className="my-0">{item.label}</h6>
              </div>
              <span className="text">{getValue(item)}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Cart;
