import { INCREMENT_TIME, DECREMENT_TIME, NEW_AMOUNT } from '../actions/counter';
import { createReducer } from 'redux-immutablejs';
import Immutable from 'immutable';

const initialState = Immutable.fromJS({
  amount: 1,
  count: 0
});

export default createReducer(initialState, {
  [INCREMENT_TIME]: (state) =>
    state.update('count', v => v + state.get('amount')),
  [DECREMENT_TIME]: (state) =>
    state.update('count', v => v - state.get('amount')),
  [NEW_AMOUNT]: (state, action) =>
    state.set('amount', action.payload)
});
