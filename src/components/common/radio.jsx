import React from "react";

function Radio({ name, value, onChange, label, ...rest }) {
  return (
    <div className="form-check form-group">
      <input
        className="form-check-input"
        type="radio"
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
    </div>
  );
}

export default Radio;
