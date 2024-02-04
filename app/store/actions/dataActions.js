import * as types from './types';

export const fetchPredictionsDataSuccess = (data) => ({
  type: types.FETCH_PREDICTIONS_DATA_SUCCESS,
  payload: data,
});

export const fetchPredictionsDataFailure = (error) => ({
  type: types.FETCH_PREDICTIONS_DATA_FAILURE,
  payload: error,
});

export const fetchHistoryDataSuccess = (data) => ({
  type: types.FETCH_HISTORY_DATA_SUCCESS,
  payload: data,
});

export const fetchHistoryDataFailure = (error) => ({
  type: types.FETCH_HISTORY_DATA_FAILURE,
  payload: error,
});
