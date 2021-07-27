import Joi from "joi";

import React from "react";
import Form from "./common/form";

import * as userService from "../services/userService";
import auth from "../services/authService";

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
    name: Joi.string().min(5).trim().required().label("Name"),
  };

  doSubmit = async () => {
    try {
      const user = this.state.data;
      const { headers } = await userService.registerUser(user);

      auth.loginUserWithJwt(headers["x-auth-token"]);

      window.location = "/";
    } catch (ex) {
      const { response } = ex;
      if (response && response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = response.data;
        this.setState({ errors });
      }
    }
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
