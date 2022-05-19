import { GET_ALL_RECIPES } from "../actions/Actions&Routes";

const initialState = {
    recipes: [],
    filter: [],
    favorites: [],
    detail:{},
    diets: []
}

export default function rootReducer(state= initialState, {type, payload}) {
    switch (type) {
        case GET_ALL_RECIPES:
            return {
                ...state, 
                recipes: payload,
                filter: payload,
            }
            ;
        default:
            return state;
    }
}