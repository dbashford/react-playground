export const INCREMENT_TIME = 'INCREMENT_TIME';
export const DECREMENT_TIME = 'DECREMENT_TIME';
export const NEW_AMOUNT = 'NEW_AMOUNT';

export function increment() {
  return {
    type: INCREMENT_TIME,
  };
}

export function decrement() {
  return {
    type: DECREMENT_TIME,
  };
}

export function newAmount(amount = 1) {
  return {
    type: NEW_AMOUNT,
    payload: amount
  };
}
