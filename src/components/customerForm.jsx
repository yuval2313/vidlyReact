import React, { useState, useEffect } from "react";

import { formUtilities } from "../utils/formUtils";
import { getCustomer, saveCustomer } from "./../services/customerService";

import Input from "./common/input";
import CheckBox from "./common/checkBox";
import FormFunctional from "./common/formFunctional";

import Joi from "joi";

function CustomerForm(props) {
  const [data, setData] = useState({
    _id: "",
    name: "",
    phone: "",
    isGold: false,
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    populateCustomer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function populateCustomer() {
    try {
      const customerId = props.match.params._id;
      if (customerId === "new") return;

      const { data: customer } = await getCustomer(customerId);
      setData(customer);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        return props.history.replace("/not-found");
    }
  }

  const schema = {
    _id: Joi.string().allow(""),
    name: Joi.string()
      .min(3)
      .max(50)
      .regex(/^[A-Z].*/)
      .required()
      .label("Name")
      .messages({
        "string.pattern.base": `First letter of "Name" must be capitalized`,
      }),
    phone: Joi.string()
      .min(3)
      .max(50)
      .regex(/^[0-9]+$/)
      .required()
      .label("Phone Number")
      .messages({
        "string.pattern.base": `"Phone Number" must be a number`,
      }),
    isGold: Joi.boolean().label("Gold Status"),
  };

  function handleCheck({ currentTarget: input }) {
    const dataClone = { ...data };
    dataClone[input.name] = !data[input.name];
    setData(dataClone);
  }

  function getUrl(customerId) {
    let url = "/customers";

    if (props.location && props.location.state) {
      const { state } = props.location;
      url = state.from.pathname;

      const { data: params, path } = state;

      if (path === "/rentals/:_id")
        url = `/rentals/${customerId}/${params._id}`;

      if (path === "/rentals/:customerId/:movieId")
        url = `/rentals/${customerId}/${params.movieId}`;
    }

    return url;
  }

  async function doSubmit() {
    const { data: customer } = await saveCustomer(data);

    window.location = getUrl(customer._id);
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
      <FormFunctional handleSubmit={handleSubmit} validate={validate}>
        <h1 className="mb-3">Customer Form</h1>
        <Input
          name={"name"}
          label={"Name"}
          value={data.name}
          error={errors.name}
          onChange={handleChange}
        />
        <Input
          name={"phone"}
          label={"Phone Number"}
          value={data.phone}
          error={errors.phone}
          onChange={handleChange}
        />
        <div className="m-3">
          <CheckBox
            name="isGold"
            label="Gold Status Member"
            value={data.isGold}
            error={errors.isGold}
            onChange={handleCheck}
          />
        </div>
      </FormFunctional>
    </div>
  );
}

export default CustomerForm;
