import Joi from "joi";

import React from "react";
import Form from "./common/form";

import { getGenres } from "../services/genreService";
import {
  getMovie,
  saveMovie,
  mapToViewModel,
} from "./../services/movieService";

class MovieForm extends Form {
  state = {
    data: {
      _id: "",
      title: "",
      genreId: "",
      numberInStock: "",
      dailyRentalRate: "",
      liked: false,
    },
    genres: [],
    errors: {},
  };

  async componentDidMount() {
    await this.populateGenres();
    await this.populateMovie();
  }

  populateGenres = async () => {
    const { data: genres } = await getGenres();
    this.setState({ genres });
  };

  populateMovie = async () => {
    try {
      const movieId = this.props.match.params._id;
      if (movieId === "new") return;

      const { data: movie } = await getMovie(movieId);
      this.setState({ data: mapToViewModel(movie) });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        return this.props.history.replace("/not-found");
    }
  };

  // mapToViewModel = (movie) => { ... } // exists in 'movieServices' module

  schema = {
    _id: Joi.string().allow(""),
    title: Joi.string().trim().required().label("Title"),
    genreId: Joi.string().trim().required().label("Genre"),
    numberInStock: Joi.number()
      .min(0)
      .max(100)
      .required()
      .label("Number In Stock"),
    dailyRentalRate: Joi.number().min(0).max(10).required().label("Rate"),
    liked: Joi.boolean(),
  };

  doSubmit = async () => {
    const movie = this.state.data;

    await saveMovie(movie);

    this.props.history.push("/movies");
  };

  render() {
    return (
      <div>
        <h1 className="m-3">Movie Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title", { autoFocus: true })}
          {this.renderDropDown("genreId", "Genre", this.state.genres)}
          {this.renderInput("numberInStock", "Number In Stock")}
          {this.renderInput("dailyRentalRate", "Rate")}
          {this.renderSubmitButton("Save")}
        </form>
      </div>
    );
  }
}

export default MovieForm;
