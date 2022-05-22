
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
} from "../actions/Actions&Routes";

const initialState = {
  recipes: [],
  copy: [],
  detail: [],
  diets: [],
  favorites: [],
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
        copy: payload,
      };
    case GET_BY_ID:
      return {
        ...state,
        detail: payload,
      };
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
        recipes: dietsFilter,
      };
    case ORDER_BY_NAME:
      let orderBy =
        payload === "A to Z"
          ? state.recipes.sort(function (a, b) {
              if (a.title > b.title) {
                return 1;
              }
              if (b.title > a.title) {
                return -1;
              }
              return 0; //
            })
          : state.recipes.sort(function (a, b) {
              if (a.title > b.title) {
                return -1;
              }
              if (b.title > a.title) {
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

//   case FILTER_BY_DIET:
//     if (payload === "All") {
//       return {
//         ...state,
//         copy: state.recipes,
//       };
//     } else if (payload) {
//       let filterarr = []
//       filterarr = state.recipes.filter((r) =>  r.diets.includes(payload))
//       return {
//         ...state,
//         filter: filterarr,
//       };
//     } else {
//       return {
//         ...state,
//   };
// }
// case ORDER_BY_NAME:
//   let sortedRecipesByName =
//     payload === "A to Z"
//       ? state.recipes.sort((a, b) => {
//           if (a.title > b.title) {
//             return 1;
//           } else if (b.title > a.title) {
//             return -1;
//           }
//           return 0;
//         })
//       : state.recipes.sort((a, b) => {
//           if (a.title > b.title) {
//             return -1;
//           } else if (b.title > a.title) {
//             return 1;
//           }
//           return 0
//         });
//         return {
//           ...state,
//           filter: sortedRecipesByName
//         }
// case ASC:
//   return {
//     ...state,
//     filter: state.recipes
//     .filter((b) => b.title !== null)
//     .sort((a, b) => (a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1)),
//   };

//   case DESC:
//     return {
//     ...state,
//     filter: state.recipes
//     .filter((b) => b.title !== null)
//     .sort((a, b) => (a.title.toLowerCase() < b.title.toLowerCase() ? 1 : -1)),
//   };
