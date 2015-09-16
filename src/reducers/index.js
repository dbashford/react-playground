import { combineReducers } from 'redux';
import Immutable from 'immutable';

import timer from './timer-reducer';

var reducers = Immutable.fromJS({
  timer
});

const rootReducer = combineReducers(reducers);

export default rootReducer;
