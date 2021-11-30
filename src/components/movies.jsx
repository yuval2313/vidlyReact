import React, { Component } from "react";
import { Link } from "react-router-dom";

import { toast } from "react-toastify";

import Pagination from "./common/pagination";
import ListGroup from "./common/listGroup";
import MoviesTable from "./moviesTable";
import SearchBox from "./common/searchBox";

import UserContext from "../context/userContext";

import {
  getMovies,
  deleteMovie,
  saveMovie,
  mapToViewModel,
} from "../services/movieService";
import { getGenres } from "../services/genreService";

import { paginate } from "../utils/paginationUtils";

import _ from "lodash";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    sortColumn: { path: "title", order: "asc" },
    searchQuery: "",
    selectedGenre: null,
  };

  async componentDidMount() {
    const { data: dbGenres } = await getGenres();
    const { data: dbMovies } = await getMovies();

    const selectedGenre = { name: "All Genres" };
    const genres = [selectedGenre, ...dbGenres];

    this.setState({ movies: dbMovies, genres, selectedGenre });
  }

  componentDidUpdate() {
    this.handlePageOverCount();
  }

  handlePageOverCount = () => {
    const { currentPage, movies, pageSize } = this.state;
    const { length: count } = movies;

    const pageCount = Math.ceil(count / pageSize);

    if (currentPage > pageCount) this.setState({ currentPage: pageCount });
  };

  handleDelete = async (movie) => {
    const originalMovies = this.state.movies;

    const movies = originalMovies.filter((m) => m._id !== movie._id);
    this.setState({ movies });

    try {
      await deleteMovie(movie._id);
    } catch (ex) {
      const { response } = ex;
      if (response) toast.error(`${response.status} - ${response.data}`);

      this.setState({ movies: originalMovies });
    }
  };

  handleLike = async (movie) => {
    const originalMovies = this.state.movies;

    const movies = [...originalMovies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movie };
    movies[index].liked = !movies[index].liked;

    this.setState({ movies });

    try {
      await saveMovie(mapToViewModel(movies[index]));
    } catch (ex) {
      const { response } = ex;
      if (response) {
        toast.error(`${response.status} - ${response.data}`);
      }

      this.setState({ movies: originalMovies });
    }
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = (genre) => {
    this.setState({ selectedGenre: genre, currentPage: 1, searchQuery: "" });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  handleSearch = (query) => {
    let { genres } = { ...this.state };
    this.setState({
      searchQuery: query,
      selectedGenre: genres[0],
      currentPage: 1,
    });
  };

  getPagedData = () => {
    const {
      movies: allMovies,
      currentPage,
      pageSize,
      sortColumn,
      selectedGenre,
      searchQuery,
    } = this.state;

    const filteredMovies =
      selectedGenre && selectedGenre._id
        ? allMovies.filter((m) => m.genre._id === selectedGenre._id)
        : searchQuery
        ? allMovies.filter((m) =>
            m.title.match(new RegExp(`^${searchQuery}`, "i"))
          )
        : allMovies;

    const sortedMovies = _.orderBy(
      filteredMovies,
      [sortColumn.path],
      [sortColumn.order]
    );

    const movies = paginate(sortedMovies, currentPage, pageSize);

    return { totalCount: filteredMovies.length, data: movies };
  };

  render() {
    const { sortColumn, pageSize, currentPage, searchQuery } = this.state;
    const { totalCount, data: movies } = this.getPagedData();

    return (
      <UserContext.Consumer>
        {(user) => (
          <div className="row">
            <div className="col-3">
              <ListGroup
                items={this.state.genres}
                selectedItem={this.state.selectedGenre}
                textProperty="name"
                valueProperty="_id"
                onItemSelect={this.handleGenreSelect}
              />
            </div>
            <div className="col">
              {user && (
                <Link to="/movies/new" className="btn btn-primary mb-2">
                  Add New Movie
                </Link>
              )}
              <SearchBox
                value={searchQuery}
                onChange={this.handleSearch}
                description={"Filter by movie title"}
              />
              <MoviesTable
                movies={movies}
                sortColumn={sortColumn}
                location={this.props.location}
                onLike={this.handleLike}
                onDelete={this.handleDelete}
                onSort={this.handleSort}
              />
              <Pagination
                itemCount={totalCount}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChange={this.handlePageChange}
              />
            </div>
          </div>
        )}
      </UserContext.Consumer>
    );
  }
}

export default Movies;
