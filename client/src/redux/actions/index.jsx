import  axios  from "axios";
import { GET_ALL_RECIPES, ROUTE_GET_ALL } from "./Actions&Routes";

export function getAll() {
  return async function request(dispatch) {
    let backRequest = await axios.get(ROUTE_GET_ALL);
    return dispatch({
      type: GET_ALL_RECIPES,
      payload: backRequest.data,
    });
  };
}
