import { types } from "../types/types";

const initialState = {
  places: [],
  active: null,
};

export const placeReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.placeActive:
      return {
        ...state,
        active: {
          ...action.payload,
        },
      };
    case types.placeLoad:
      return {
        ...state,
        places: [...action.payload],
      };

    case types.placeUpdated:
      return {
        ...state,
        places: state.places.map((place) =>
          place.id === action.payload.place ? action.payload : place
        ),
      };
    case types.placesDelete:
      return {
        ...state,
        active: null,
        places: state.places.filter((place) => place.id !== action.payload),
      };
    

    default:
      return state;
  }
};
