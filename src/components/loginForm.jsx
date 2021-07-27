import Joi from "joi";

import React from "react";
import { Redirect } from "react-router";
import Form from "./common/form";

import auth from "./../services/authService";

class LoginForm extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {},
  };

  schema = {
    username: Joi.string().required().trim().label("Username"),
    password: Joi.string().required().trim().label("Password"),
  };

  doSubmit = async () => {
    try {
      const user = this.state.data;

      await auth.loginUser(user);

      const { state } = this.props.location;
      window.location = state ? state.from.pathname : "/";
    } catch (ex) {
      const { response } = ex;

      if (response && response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = response.data;
        return this.setState({ errors });
      }
    }
  };

  render() {
    if (auth.getCurrentUser()) return <Redirect to="/" />;

    return (
      <div>
        <h1 className="m-3">Login</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username", { autoFocus: true })}
          {this.renderInput("password", "Password", { type: "password" })}
          {this.renderSubmitButton("Login")}
        </form>
      </div>
    );
  }
}

export default LoginForm;
