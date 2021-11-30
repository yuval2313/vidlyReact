import React, { useState } from "react";

import Joi from "joi";

import FormFunctional from "./common/formFunctional";
import Input from "./common/input";
import Radio from "./common/radio";
import Button from "./common/button";

import { formUtilities } from "../utils/formUtils";
import { verifyCardExpiration } from "../utils/verifyCardExpiration";

function PaymentForm({ doSubmit }) {
  const [data, setData] = useState({
    nameOnCard: "",
    cardNumber: "",
    expirationDate: "",
    cvv: "",
  });

  const [isCashPayment, setIsCashPayment] = useState(false);

  const [errors, setErrors] = useState({});

  const schema = {
    nameOnCard: Joi.string()
      .regex(/^(\b[A-Z]\w*\s*)+$/)
      .required()
      .label("Name on card")
      .messages({
        "string.pattern.base": `First letter of each word must be capitalized`,
      }),
    cardNumber: Joi.string()
      .regex(
        /^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/
      )
      .required()
      .label("Card Number")
      .messages({
        "string.pattern.base": `Must be a valid credit card number`,
      }),
    expirationDate: Joi.string()
      .custom((value, helper) => {
        if (verifyCardExpiration(value)) return true;
        else return helper.message("Must be a valid expiration date!");
      })
      .required()
      .label("Expiration Date"),
    cvv: Joi.string()
      .regex(/^[0-9]{3}$/)
      .required()
      .label("CVV")
      .messages({
        "string.pattern.base": `Must be a valid CVV`,
      }),
  };

  function handleRadio({ currentTarget: input }) {
    if (input.name === "isCashPayment") setIsCashPayment(true);
    else setIsCashPayment(false);
  }

  const { validate, handleChange, handleSubmit } = formUtilities(
    schema,
    data,
    errors,
    setData,
    setErrors,
    doSubmit
  );

  return (
    <div>
      <div className="row my-3">
        <h4 className="col-auto">Payment</h4>
        <div className="col-auto mt-1">
          <Radio
            name="isCreditPayment"
            label="Credit"
            value={!isCashPayment}
            onChange={handleRadio}
          />
        </div>
        <div className="col-auto mt-1">
          <Radio
            name="isCashPayment"
            label="Cash"
            value={isCashPayment}
            onChange={handleRadio}
          />
        </div>
      </div>
      {isCashPayment ? (
        <Button
          label="Cash Payment"
          className="w-100 btn btn-primary btn-lg mb-3 mt-4"
          onClick={doSubmit}
        />
      ) : (
        <FormFunctional
          handleSubmit={handleSubmit}
          validate={validate}
          buttonClass={"w-100 btn btn-primary btn-lg mb-3 mt-4"}
        >
          <div className="row gy-3">
            <div className="col-md-6">
              <Input
                name="nameOnCard"
                label="Name on card"
                error={errors.nameOnCard}
                value={data.nameOnCard}
                onChange={handleChange}
                placeholder="Full name as displayed on card"
              />
            </div>
            <div className="col-md-6">
              <Input
                name="cardNumber"
                label="Credit card number"
                error={errors.cardNumber}
                value={data.cardNumber}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-3">
              <Input
                name="expirationDate"
                label="Expiration Date"
                error={errors.expirationDate}
                value={data.expirationDate}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-3">
              <Input
                name="cvv"
                label="CVV"
                error={errors.cvv}
                value={data.cvv}
                onChange={handleChange}
              />
            </div>
          </div>
        </FormFunctional>
      )}
    </div>
  );
}

export default PaymentForm;
