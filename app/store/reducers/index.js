import { combineReducers } from 'redux';
import predictionsReducer from './predictionsReducer';
import historyReducer from './historyReducer';

const rootReducer = combineReducers({
  predictions: predictionsReducer,
  history: historyReducer,
});

export default rootReducer;
