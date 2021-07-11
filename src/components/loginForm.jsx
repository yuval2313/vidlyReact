import Joi from "joi";

import React from "react";
import Form from "./common/form";

class LoginForm extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {},
  };

  schema = {
    username: Joi.string().required().trim().label("Username"),
    password: Joi.string().required().trim().label("Password"),
  };

  doSubmit = () => {
    //Call server etc..
    console.log("submitted");
  };

  render() {
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
