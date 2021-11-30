import React from "react";

function Button({ label, className, disabled, onClick }) {
  return (
    <button className={className} disabled={disabled} onClick={onClick}>
      {label}
    </button>
  );
}

Button.defaultProps = {
  className: "btn btn-primary m-2",
};

export default Button;
