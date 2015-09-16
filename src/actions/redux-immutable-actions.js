import { handleAction as _handleAction } from 'redux-actions';
import Immutable from 'immutable';

export default function handleAction(type, reducers) {
  const wrappedAction = _handleAction(type, reducers);

  return (_state, action) => {
    const state = wrappedAction(_state, action);
    if (!Immutable.Iterable.isIterable(state)) {
      throw new TypeError('Reducers must return Immutable objects.');
    }
    return state;
  };
}
