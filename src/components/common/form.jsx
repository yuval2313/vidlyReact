import Joi from "joi";
import React, { Component } from "react";
import Input from "./input";
import DropDown from "./dropDown";

class Form extends Component {
  state = {
    data: {},
    errors: {},
  };

  validate = () => {
    const options = { abortEarly: false };
    const schema = Joi.object(this.schema);
    const { error } = schema.validate(this.state.data, options);

    if (!error) return null;

    const errors = {};

    for (let item of error.details) errors[item.path[0]] = item.message;

    return errors;
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = Joi.object({ [name]: this.schema[name] });
    const { error } = schema.validate(obj);

    return error ? error.details[0].message : null;
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;

    this.doSubmit();
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data, errors });
  };

  renderSubmitButton = (label) => {
    return (
      <button disabled={this.validate()} className="btn btn-primary m-2">
        {label}
      </button>
    );
  };

  renderInput = (name, label, options = { autoFocus: false, type: "text" }) => {
    const { data, errors } = this.state;

    return (
      <Input
        name={name}
        label={label}
        value={data[name]}
        error={errors[name]}
        onChange={this.handleChange}
        {...options}
      />
    );
  };

  renderDropDown = (name, label, placeholder, items) => {
    const { data, errors } = this.state;

    return (
      <DropDown
        name={name}
        label={label}
        placeholder={placeholder}
        value={data[name]}
        items={items}
        error={errors[name]}
        onChange={this.handleChange}
      />
    );
  };
}

export default Form;
