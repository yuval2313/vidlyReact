import React from "react";

function CheckBox({ name, value, onChange, error, label, ...rest }) {
  return (
    <div className="form-check form-group">
      <input
        className="form-check-input"
        type="checkbox"
        id={name}
        name={name}
        value={value}
        checked={value}
        onChange={onChange}
        {...rest}
      />
      <label className="form-check-label" htmlFor={name}>
        {label}
      </label>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
}

export default CheckBox;
