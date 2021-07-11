import React from "react";

const SearchBox = ({ value, onChange }) => {
  return (
    <input
      type="search"
      className="form-control mb-2"
      placeholder="Search..."
      aria-label="Search"
      value={value}
      onChange={(e) => onChange(e.currentTarget.value)}
    />
  );
};

export default SearchBox;
