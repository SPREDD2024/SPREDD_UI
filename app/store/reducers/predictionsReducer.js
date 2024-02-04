import * as types from '../actions/types';

const initialState = {
  data: [],
  error: null,
};

const predictionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_PREDICTIONS_DATA_SUCCESS:
      return {
        ...state,
        data: action.payload,
        error: null,
      };
    case types.FETCH_PREDICTIONS_DATA_FAILURE:
      return {
        ...state,
        data: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

export default predictionsReducer;
