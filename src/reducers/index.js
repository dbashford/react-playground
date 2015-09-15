import { combineReducers } from 'redux-immutablejs';

import timer from './timer-reducer';

const rootReducer = combineReducers({
  timer
});

export default rootReducer;
