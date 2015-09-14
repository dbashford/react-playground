import { INCREMENT_TIME, DECREMENT_TIME, NEW_AMOUNT } from '../actions/timer';
import Immutable from 'immutable';

function construct() {
  return Immutable.fromJS({
    amount: 1,
    value: 0
  });
}

export default function(state = construct(), action) {
  switch (action.type) {
  case INCREMENT_TIME:
    return state.update('value', v => v + state.get('amount'));
  case DECREMENT_TIME:
    return state.update('value', v => v - state.get('amount'));
  case NEW_AMOUNT:
    return state.set('amount', action.amount);
  default:
    return state;
  }
}

