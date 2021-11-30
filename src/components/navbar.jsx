import React, { useContext } from "react";
import { NavLink, Link } from "react-router-dom";

import UserContext from "../context/userContext";

const NavBar = () => {
  const user = useContext(UserContext);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Vidly
        </Link>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <div className="navbar-nav">
            <NavLink className="nav-item nav-link" to="/movies">
              Movies
            </NavLink>
            <NavLink className="nav-item nav-link" to="/customers">
              Customers
            </NavLink>
            <NavLink className="nav-item nav-link" to="/rentals">
              Rentals
            </NavLink>
          </div>
          <div className="navbar-nav ms-auto">
            {!user ? (
              <React.Fragment>
                <NavLink className="nav-item nav-link" to="/login">
                  Login
                </NavLink>
                <NavLink className="nav-item nav-link" to="/register">
                  Register
                </NavLink>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <NavLink className="nav-item nav-link" to="/user">
                  {user.name}
                </NavLink>
                <NavLink className="nav-item nav-link" to="/logout">
                  Log Out
                </NavLink>
              </React.Fragment>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
