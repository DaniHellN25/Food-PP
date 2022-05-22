import axios from "axios";
import {
  FILTER_BY_DIET,
  GET_ALL_RECIPES,
  GET_TYPES,
  ORDER_BY_NAME, ORDER_BY_SCORE,
  ROUTE_GET_ALL,
  ROUTE_GET_TYPES,
  GET_BY_ID,
CLEAR, GET_BY_NAME, ROUTE_GET_BY_NAME, ROUTE_GET_BY_ID, CREATE_RECIPE, ROUTE_POST
} from "./Actions&Routes";

export function getAll() {
  try {
    return async function request(dispatch) {
      let backRequest = await axios.get(ROUTE_GET_ALL);
      return dispatch({
        type: GET_ALL_RECIPES,
        payload: backRequest.data,
      });
    };
  } catch (error) {
    console.error(error)
  }

}
export function getById(id) {
  return async function (dispatch) {
    try {
      let backRequest = await axios.get(ROUTE_GET_BY_ID + id);
      return dispatch({
        type: GET_BY_ID,
        payload: backRequest.data,
      });
    } catch (err) {
      alert("Recipe not found");
    }
  };
}


export function searchByName(name) {
  return async function (dispatch) {
    try {
      let backRequest = await axios.get(ROUTE_GET_BY_NAME + name);
      return dispatch({
        type: GET_BY_NAME,
        payload: backRequest.data,
      });
    } catch (err) {
      alert("Recipe not found");
    }
  };
}




export const postRecipe = (payload) => async (dispatch) => {
  try {
    return await axios.post(ROUTE_POST, payload)
      .then(dispatch({ type: CREATE_RECIPE }))
      .catch((error) => console.log(error.message));
  } catch (error) {
    console.log(error);
  }
};



export function getDiets() {
  try {
    return async (dispatch) => {
      let backRequest = await axios.get(ROUTE_GET_TYPES);
      return dispatch({
        type: GET_TYPES,
        payload: backRequest.data,
      });
    };
  } catch (error) {
    console.error(error)
  }

}

export function filterByDiet(value) {
  return {
    type: FILTER_BY_DIET,
    payload: value
}
}


export function orderByName(payload) {
  return {
    type: ORDER_BY_NAME,
    payload,
  };
}

export function orderByRating(payload) {
  return {
    type: ORDER_BY_SCORE,
    payload,
  };
}

export function clear() {
  return {
    type: CLEAR,
  };
}

// export function orderScore(value) {
// }