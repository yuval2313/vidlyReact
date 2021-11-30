import React, { useState, useEffect, useCallback, useRef } from "react";
import RouteContext from "../context/routeContext";
import CustomersContext from "../context/customersContext";

import Joi from "joi";

import { getCustomers } from "../services/customerService";
import { getMovies } from "../services/movieService";
import { saveRental } from "../services/rentalService";
import { formUtilities } from "../utils/formUtils";

import FormFunctional from "./common/formFunctional";
import CustomerSelect from "./customerSelect";
import MovieSelect from "./movieSelect";

function RentalForm(props) {
  const [data, setData] = useState({
    customerId: "",
    movieId: "",
  });
  const [customers, setCustomers] = useState([]);
  const [movies, setMovies] = useState([]);
  const [errors, setErrors] = useState({});

  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      populateCustomers();
      populateMovies();
    } else {
      const { _id, customerId, movieId } = props.match.params;

      if (_id && _id !== "new") {
        populateIdByParam("_id", customers, "customerId");
        populateIdByParam("_id", movies, "movieId");
      }

      if (customerId && !data.customerId) {
        populateIdByParam("customerId", customers);
      }

      if (movieId && !data.movieId) {
        populateIdByParam("movieId", movies);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customers, movies]);

  const populateCustomers = useCallback(async () => {
    const { data: customers } = await getCustomers();
    setCustomers(customers);
  }, []);

  const populateMovies = useCallback(async () => {
    const { data: movies } = await getMovies();
    setMovies(movies);
  }, []);

  function populateIdByParam(param, array, idPropName) {
    const _id = props.match.params[param];
    const item = array.filter((item) => item._id === _id)[0];

    if (item) {
      const dataClone = { ...data };
      dataClone[idPropName ? idPropName : param] = _id;
      setData(dataClone);
    }
  }

  const schema = {
    customerId: Joi.string()
      .custom((value, helper) => {
        if (validateId(value, customers)) return true;
        return helper.message("Must choose an existing customer");
      })
      .required()
      .label("Name"),
    movieId: Joi.string()
      .custom((value, helper) => {
        if (validateId(value, movies)) return true;
        return helper.message("Must choose an existing movie");
      })
      .required()
      .label("Title"),
  };

  function validateId(id, array) {
    for (const item of array) {
      if (item._id === id) return true;
    }
    return false;
  }

  async function doSubmit() {
    try {
      await saveRental(data);
    } catch (ex) {
      const { response } = ex;
      if (response.data.match(/.*movie.*/i))
        return setErrors({ movieId: response.data });
      if (response.data.match(/.*customer.*/i))
        return setErrors({ customerId: response.data });
    }
    const { state } = props.location;
    window.location = state ? state.from.pathname : "/rentals";
  }

  const { validate, handleChange, handleSubmit } = formUtilities(
    schema,
    data,
    errors,
    setData,
    setErrors,
    doSubmit
  );

  return (
    <div>
      <RouteContext.Provider
        value={{ location: props.location, match: props.match }}
      >
        <CustomersContext.Provider value={customers}>
          <FormFunctional handleSubmit={handleSubmit} validate={validate}>
            <h1 className="mb-3">Rental Form</h1>
            <div className="m-2">
              <CustomerSelect
                customers={customers}
                data={data}
                errors={errors}
                handleChange={handleChange}
              />
            </div>
            <div className="m-2">
              <MovieSelect
                movies={movies}
                data={data}
                errors={errors}
                handleChange={handleChange}
              />
            </div>
          </FormFunctional>
        </CustomersContext.Provider>
      </RouteContext.Provider>
    </div>
  );
}

export default RentalForm;
