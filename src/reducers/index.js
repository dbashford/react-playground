import { combineReducers } from 'redux-immutablejs';
import counter from './counter-reducer';

const rootReducer = combineReducers({
  counter
});

export default rootReducer;
