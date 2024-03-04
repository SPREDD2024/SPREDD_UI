import * as types from "../actions/types";

const initialState = {
  isAdmin: false,
  users: [],
  currentUser: {},
  error: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_USER_SUCCESS:
      return {
        ...state,
        isAdmin: action.payload.isAdmin,
        currentUser: action.payload.user,
        error: null,
      };
    case types.FETCH_USER_FAILURE:
      return {
        ...state,
        isAdmin: false,
        currentUser: {},
        error: action.payload,
      };
    case types.FETCH_ALL_USERS_SUCCESS:
      return {
        ...state,
        users: action.payload,
        error: null,
      };
    case types.FETCH_ALL_USERS_FAILURE:
      return {
        ...state,
        users: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
