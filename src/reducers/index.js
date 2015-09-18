import { combineReducers } from 'redux-immutablejs';
import count from './count-reducer';

const rootReducer = combineReducers({
  count
});

export default rootReducer;
