import { FILTER_BY_DIET, GET_ALL_RECIPES, GET_TYPES } from "../actions/Actions&Routes";

const initialState = {
  recipes: [],
  filter: [],
  favorites: [],
  detail: {},
  diets: [],
};
// var stringHasAll = (s, query) => 
//   // convert the query to array of "words" & checks EVERY item is contained in the string
//   query.split(' ').every(q => new RegExp('\\b' + q + '\\b', 'i').test(s)); 
export default function rootReducer(state = initialState, { type, payload }) {
  switch (type) {
    case GET_ALL_RECIPES:
      return {
        ...state,
        recipes: payload,
        filter: payload,
      };
    case FILTER_BY_DIET:
      if (payload === "All") {
        return {
          ...state,
          filter: state.recipes,
        };
      } else if (payload) {
        return {
          ...state,
          filter: state.recipes.filter((r) => r.diets.includes(payload)),
        };
      } else {
          return {
              ...state
          }
      }
      case GET_TYPES:
          return {
              ...state,
             diets: payload
          }
    default:
      return state;
  }
}
