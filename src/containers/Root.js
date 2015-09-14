import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import TimerApp from './TimerContainer';
import rootReducer from '../reducers';

const store = createStore(rootReducer);

if (module.hot) {
  // Enable Webpack hot module replacement for reducers
  module.hot.accept('../reducers', () => {
    const nextRootReducer = require('../reducers/index');
    store.replaceReducer(nextRootReducer);
  });
}

export default class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <TimerApp />
      </Provider>
    );
  }
}
