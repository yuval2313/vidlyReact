import React from "react";

const DropDown = ({
  name,
  label,
  error,
  items,
  textProperty,
  valueProperty,
  ...rest
}) => {
  return (
    <div className="form-group m-2">
      <label htmlFor={name}>{label}</label>
      <select className="form-select" name={name} id={name} {...rest}>
        <option value="">Please Select a Genre...</option>
        {items.map((item) => (
          <option key={item[valueProperty]} value={item[valueProperty]}>
            {item[textProperty]}
          </option>
        ))}
      </select>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

DropDown.defaultProps = {
  textProperty: "name",
  valueProperty: "_id",
};

export default DropDown;
