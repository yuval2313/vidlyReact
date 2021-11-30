import React from "react";
import Button from "./button";

function FormFunctional({
  children,
  handleSubmit,
  validate,
  buttonLabel,
  buttonClass,
}) {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        {children}
        <Button
          label={buttonLabel}
          disabled={validate ? validate() : false}
          className={buttonClass}
        />
      </form>
    </div>
  );
}

FormFunctional.defaultProps = {
  buttonLabel: "Submit",
};

export default FormFunctional;
