import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import NavBar from "./components/navbar";
import Movies from "./components/movies";
import MovieForm from "./components/movieForm";
import Customers from "./components/customers";
import CustomerForm from "./components/customerForm";
import Rentals from "./components/rentals";
import CheckoutForm from "./components/checkoutForm";
import RentalForm from "./components/rentalForm";
import RegisterForm from "./components/registerForm";
import LoginForm from "./components/loginForm";
import Logout from "./components/logout";
import NotFound from "./components/common/notFound";
import ProtectedRoute from "./components/common/protectedRoute";

import UserContext from "./context/userContext";

import auth from "./services/authService";

import "./App.css";
import "react-toastify/dist/ReactToastify.css";

class App extends Component {
  state = {};

  componentDidMount() {
    this.getUser();
  }

  getUser = () => {
    const user = auth.getCurrentUser();
    this.setState({ user });
  };

  render() {
    return (
      <UserContext.Provider value={this.state.user}>
        <React.Fragment>
          <ToastContainer />
          <NavBar />
          <main className="container">
            <Switch>
              <Route path="/register" component={RegisterForm} />
              <Route path="/login" component={LoginForm} />
              <Route path="/logout" component={Logout} />
              <ProtectedRoute path="/movies/:_id" component={MovieForm} />
              <Route path="/movies" component={Movies} />
              <ProtectedRoute path="/customers/:_id" component={CustomerForm} />
              <Route path="/customers" component={Customers} />
              <ProtectedRoute
                path={"/rentals/:customerId/:movieId"}
                component={RentalForm}
              />
              <ProtectedRoute path={"/rentals/:_id"} component={RentalForm} />
              <Route path="/rentals" component={Rentals} />
              <ProtectedRoute path="/returns/:_id" component={CheckoutForm} />
              <Route path="/not-found" component={NotFound} />
              <Redirect exact from="/" to="/movies" />
              <Redirect to="/not-found" />
            </Switch>
          </main>
        </React.Fragment>
      </UserContext.Provider>
    );
  }
}

export default App;
