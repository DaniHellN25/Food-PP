import axios from "axios";
import {
  FILTER_BY_DIET,
  GET_ALL_RECIPES,
  GET_TYPES,
  ROUTE_GET_ALL,
  ROUTE_GET_TYPES,
} from "./Actions&Routes";

export function getAll() {
  return async function request(dispatch) {
    let backRequest = await axios.get(ROUTE_GET_ALL);
    return dispatch({
      type: GET_ALL_RECIPES,
      payload: backRequest.data,
    });
  };
}

export function filter(value) {
  return (dispatch) => {
    dispatch({ type: FILTER_BY_DIET, payload: value });
  };
}

export function getDiets() {
  return async (dispatch) => {
    let backRequest = await axios.get(ROUTE_GET_TYPES);
    return dispatch({
      type: GET_TYPES,
      payload: backRequest.data,
    });
  };
}
