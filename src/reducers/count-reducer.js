import { INCREMENT_COUNT, DECREMENT_COUNT, SET_SETTINGS } from '../actions/counter';
import { createReducer } from 'redux-immutablejs';
import Immutable from 'immutable';

const initialState = Immutable.fromJS({
  count: 0,
  settings: {
    amount: 1,
    isIncrement: true,
    interval: 1000
  }
});

export default createReducer(initialState, {
  [INCREMENT_COUNT]: (state) =>
    state.update('count', v => v + state.getIn(['settings', 'amount'])),
  [DECREMENT_COUNT]: (state) =>
    state.update('count', v => v - state.getIn(['settings', 'amount'])),
  [SET_SETTINGS]: (state, action) =>
    state.set('settings', Immutable.fromJS(action.payload))
});
