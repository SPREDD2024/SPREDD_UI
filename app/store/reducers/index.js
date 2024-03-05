import { combineReducers } from 'redux';
import predictionsReducer from './predictionsReducer';
import historyReducer from './historyReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
  predictions: predictionsReducer,
  history: historyReducer,
  user: userReducer,
});

export default rootReducer;
