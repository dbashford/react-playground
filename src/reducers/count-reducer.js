import { UPDATE_COUNT, SET_SETTINGS, INITIALIZE } from '../actions';
import { createReducer } from 'redux-immutablejs';
import Immutable from 'immutable';

export default createReducer(Immutable.fromJS({}), {
  [UPDATE_COUNT]: (state) => {
    const isIncrement = state.getIn(['settings', 'increment']);
    let amount = state.getIn(['settings', 'amount']);
    if (!isIncrement) {
      amount = -amount;
    }
    return state.update('count', v => v + amount);
  },
  [SET_SETTINGS]: (state, action) => state.set('settings', Immutable.fromJS(action.payload)),
  [INITIALIZE]: (state, action) => Immutable.fromJS(action.payload)
});
