import React, { Component } from "react";
import { Link } from "react-router-dom";

import Like from "./common/like";
import Table from "./common/table";

import UserContext from "../context/userContext";

import auth from "../services/authService";

class MoviesTable extends Component {
  static contextType = UserContext;

  columns = [
    {
      path: "title",
      label: "Title",
      content: (movie) => (
        <div>
          <Link
            to={this.getRentUrl(movie._id)}
            className="btn btn-success btn-sm me-3"
          >
            Rent Movie
          </Link>
          <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
        </div>
      ),
    },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    {
      path: "dailyRentalRate",
      label: "Daily Rate",
      content: (movie) => `${movie.dailyRentalRate}$`,
    },
    {
      key: "like",
      content: (movie) => (
        <Like
          liked={movie.liked}
          onClick={() => this.props.onLike(movie)}
          disabled={!this.currentUser()}
        />
      ),
    },
  ];

  deleteColumn = {
    key: "delete",
    content: (movie) => (
      <button
        onClick={() => this.props.onDelete(movie)}
        className="btn btn-danger btn-sm"
      >
        Delete
      </button>
    ),
  };

  getRentUrl = (movieId) => {
    let url = `/rentals/${movieId}`;

    if (this.props.location && this.props.location.state) {
      const { state } = this.props.location;
      const { data: params, path } = state;
      console.log({ state });

      if (path === "/rentals/:_id") url = `/rentals/${params._id}/${movieId}`;

      if (path === "/rentals/:customerId/:movieId")
        url = `/rentals/${params.customerId}/${movieId}`;
    }

    return url;
  };

  currentUser = () => {
    return this.context;
  };

  constructor() {
    super();
    const user = auth.getCurrentUser();
    if (user && user.isAdmin) this.columns.push(this.deleteColumn);
  }

  render() {
    const { movies, sortColumn, onSort } = this.props;
    return (
      <Table
        columns={this.columns}
        data={movies}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default MoviesTable;
