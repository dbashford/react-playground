import { INCREMENT_TIME, DECREMENT_TIME, NEW_AMOUNT } from '../actions/timer';
import { createReducer } from 'redux-immutablejs';
import Immutable from 'immutable';

const initialState = Immutable.fromJS({
  amount: 1,
  value: 0
});

export default createReducer(initialState, {
  [INCREMENT_TIME]: (state) =>
    state.update('value', v => v + state.get('amount')),
  [DECREMENT_TIME]: (state) =>
    state.update('value', v => v - state.get('amount')),
  [NEW_AMOUNT]: (state, action) =>
    state.set('amount', action.payload)
});
