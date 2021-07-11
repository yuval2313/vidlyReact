import Joi from "joi";

import React from "react";
import Form from "./common/form";

class RegisterForm extends Form {
  state = {
    data: {
      username: "",
      password: "",
      name: "",
    },
    errors: {},
  };

  schema = {
    username: Joi.string()
      .email({ tlds: false })
      .trim()
      .required()
      .label("Username"),
    password: Joi.string().min(5).trim().required().label("Password"),
    name: Joi.string().trim().required().label("Name"),
  };

  doSubmit = () => {
    // call server...
    console.log("submitted - register");
  };

  render() {
    return (
      <div>
        <h1 className="m-3">Register</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username", { autoFocus: true })}
          {this.renderInput("password", "Password", { type: "password" })}
          {this.renderInput("name", "Name")}
          {this.renderSubmitButton("Register")}
        </form>
      </div>
    );
  }
}

export default RegisterForm;
