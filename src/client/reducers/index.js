import { combineReducers } from 'redux';

import optimist from 'redux-optimist';
import count from './count-reducer';

let rootReducer = combineReducers({
  count
});

rootReducer = optimist(rootReducer);

export default rootReducer;
