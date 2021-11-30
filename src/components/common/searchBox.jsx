import React from "react";

const SearchBox = ({
  name,
  value,
  onChange,
  placeholder,
  description,
  label,
  labelStyle,
  descriptionStyle,
}) => {
  function renderLabel() {
    if (label)
      return (
        <div className="col-auto">
          <label htmlFor={name} className="col-form-label" style={labelStyle}>
            {label}
          </label>
        </div>
      );
  }

  function renderDescription() {
    if (description)
      return (
        <div className="col-auto">
          <span id={name} className="form-text" style={descriptionStyle}>
            {description}
          </span>
        </div>
      );
  }

  return (
    <div className="row g-3 align-items-center mb-2">
      {renderLabel()}
      <div className="col">
        <input
          className="form-control"
          type="search"
          id={name}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.currentTarget.value)}
        />
      </div>
      {renderDescription()}
    </div>
  );
};

SearchBox.defaultProps = {
  placeholder: "Search...",
};

export default SearchBox;
