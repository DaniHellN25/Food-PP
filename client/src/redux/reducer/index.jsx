
import {
  FILTER_BY_DIET,
  GET_ALL_RECIPES,
  GET_TYPES,
  ORDER_BY_NAME,
  ORDER_BY_SCORE,
  GET_BY_NAME,
  GET_BY_ID,
  CLEAR,
  CREATE_RECIPE,
  REMOVE_FAVORITE,
  ADD_FAVORITE,
} from "../actions/Actions&Routes";

const initialState = {
  recipes: [],
  copy: [],
  detail: [],
  diets: [],
  favorites: [],
};
export default function rootReducer(state = initialState, { type, payload }) {
  switch (type) {
    case GET_ALL_RECIPES:
      return {
        ...state,
        recipes: payload,
        copy: payload,
      };
    case GET_BY_ID:
      return {
        ...state,
        detail: payload,
      };
      case ADD_FAVORITE:
      const findRecipe = state.favorites.find((recipe)=> recipe.id === payload.id )
      if(findRecipe) {
        return state
      }else{
        return {
          ...state,
          favorites: [...state.favorites,payload]
        } 
      }
    case REMOVE_FAVORITE:
      return{
        ...state,
        favorites: state.favorites.filter((recipe)=> recipe.id !== payload)
      }
    case GET_BY_NAME:
      return {
        ...state,
        recipes: payload,
      };
    case GET_TYPES:
      return {
        ...state,
        diets: payload,
      };
      case CREATE_RECIPE:
      return {
        ...state,
      };
    case FILTER_BY_DIET:
      const filterRecipes = state.copy;
      const dietsFilter =
        payload === "All"
          ? state.copy
          : filterRecipes.filter((r) => r.diets.includes(payload));
      return {
        ...state,
        recipes: dietsFilter
      };
    case ORDER_BY_NAME:
      let orderBy =
        payload === "A to Z"
          ? state.recipes.sort(function (a, b) {
              if (a.title.toLowerCase() > b.title.toLowerCase()) {
                return 1;
              }
              if (b.title.toLowerCase() > a.title.toLowerCase()) {
                return -1;
              }
              return 0; //
            })
          : state.recipes.sort(function (a, b) {
              if (a.title.toLowerCase() > b.title.toLowerCase()) {
                return -1;
              }
              if (b.title.toLowerCase() > a.title.toLowerCase()) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        recipes: orderBy,
      };
      case ORDER_BY_SCORE:
      let rating =
        payload === "High Score"
          ? state.recipes.sort(function (a, b) {
              return b.healthScore - a.healthScore;
            })
          : state.recipes.sort(function (a, b) {
              return a.healthScore - b.healthScore;
            });
      return {
        ...state,
        recipes: rating,
      };
    case CLEAR:
      return {
        ...state,
        detail: [],
      };
    default:
      return state;
  }
}
