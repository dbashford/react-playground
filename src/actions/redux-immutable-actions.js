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


// in node_modules/redux-actions/lib/handleActions
// function handleActions(handlers, defaultState, handleAct) {
//   var reducers = _ownKeys2['default'](handlers).map(function (type) {
//     var data = handleAct(type, handlers[type]);
//     //var data = _handleAction2['default'](type, handlers[type]);
//     return data;
//   });
