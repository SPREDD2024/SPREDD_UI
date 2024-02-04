import * as types from '../actions/types';

const initialState = {
  data: [],
  error: null,
};

const historyReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_HISTORY_DATA_SUCCESS:
      return {
        ...state,
        data: action.payload,
        error: null,
      };
    case types.FETCH_HISTORY_DATA_FAILURE:
      return {
        ...state,
        data: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

export default historyReducer;
