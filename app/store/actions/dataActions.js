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

export const fetchUserSuccess = (data) => ({
  type: types.FETCH_USER_SUCCESS,
  payload: data,
});

export const fetchUserFailure = (error) => ({
  type: types.FETCH_USER_FAILURE,
  payload: error,
});

export const fetchAllUsersSuccess = (data) => ({
  type: types.FETCH_ALL_USERS_SUCCESS,
  payload: data,
});

export const fetchAllUsersFailure = (error) => ({
  type: types.FETCH_ALL_USERS_FAILURE,
  payload: error,
});

export const setUserSuccess = (data) => ({
  type: types.SET_USER_SUCCESS,
  payload: data,
});

export const setUserFailure = (error) => ({
  type: types.SET_USER_FAILURE,
  payload: error,
});
