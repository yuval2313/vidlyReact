import React, { useState, useEffect } from "react";

import DataList from "./dataList";
import Details from "./details";

function Select({
  items,
  data,
  errors,
  details,
  primaryLabel,
  valueProperty,
  textProperty,
  dataValueProperty,
  handleChange,
}) {
  const [item, setItem] = useState({});

  useEffect(() => {
    const item = items.filter(
      (i) => i[valueProperty] === data[dataValueProperty]
    )[0];
    setItem(item);
  }, [items, data, dataValueProperty, valueProperty]);

  return (
    <div>
      <DataList
        items={items}
        value={data[dataValueProperty]}
        error={errors[dataValueProperty]}
        name={dataValueProperty}
        label={primaryLabel}
        textProperty={textProperty}
        onChange={handleChange}
      />
      {item && <Details data={item} details={details} />}
    </div>
  );
}

Select.defaultProps = {
  valueProperty: "_id",
  textProperty: "name",
};

export default Select;
