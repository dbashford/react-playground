import { INCREMENT_TIME, DECREMENT_TIME, NEW_AMOUNT } from '../actions/timer';

export default function(state = {amount: 1, value: 0}, action) {
  switch (action.type) {
  case INCREMENT_TIME:
    return {
      ...state,
      value: state.value + state.amount
    };
  case DECREMENT_TIME:
    return {
      ...state,
      value: state.value - state.amount
    };
  case NEW_AMOUNT:
    return {
      ...state,
      amount: action.amount
    };
  default:
    return state;
  }
}
