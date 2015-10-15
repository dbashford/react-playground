import { UPDATE_COUNT, SET_SETTINGS } from '../actions/counter';
import { createReducer } from 'redux-immutablejs';
import Immutable from 'immutable';

const initialState = Immutable.fromJS({
  count: 0,
  settings: {
    amount: 1,
    interval: 1000,
    increment: true
  }
});

export default createReducer(initialState, {
  [UPDATE_COUNT]: (state) => {
    const isIncrement = state.getIn(['settings', 'increment']);
    let amount = state.getIn(['settings', 'amount']);
    if (!isIncrement) {
      amount = -amount;
    }
    return state.update('count', v => v + amount);
  },
  [SET_SETTINGS]: (state, action) =>
    state.set('settings', Immutable.fromJS(action.payload))
});
