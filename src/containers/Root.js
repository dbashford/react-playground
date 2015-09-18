import React, { Component } from 'react';
import { Provider } from 'react-redux';
// import { compose, createStore, applyMiddleware } from 'redux';
import { compose, createStore } from 'redux';
import App from './App';
import rootReducer from '../reducers';

let finalCreateStore;
if (__DEVELOPMENT__ && __CLIENT__ && __DEVTOOLS__) {
  const { devTools, persistState } = require('redux-devtools');
  finalCreateStore = compose(
    // Enables your middleware:
    // applyMiddleware(m1, m2, m3), // any Redux middleware, e.g. redux-thunk
    // Provides support for DevTools:
    devTools(),
    // Lets you write ?debug_session=<name> in address bar to persist debug sessions
    persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
  )(createStore);
} else {
  finalCreateStore = createStore;
}

const store = finalCreateStore(rootReducer);

if (__DEVELOPMENT__ && module.hot) {
  // Enable Webpack hot module replacement for reducers
  module.hot.accept('../reducers', () => {
    const nextRootReducer = require('../reducers/index');
    store.replaceReducer(nextRootReducer);
  });
}

export default class Root extends Component {
  render() {
    const provider = (
      <Provider store={store}>
        <App />
      </Provider>
    );

    let component;
    if (__DEVELOPMENT__ && __CLIENT__ && __DEVTOOLS__) {
      const { DevTools, DebugPanel, LogMonitor } = require('redux-devtools/lib/react');

      component = (
        <div>
          { provider }
          <DebugPanel top right bottom>
            <DevTools store={store} monitor={LogMonitor} />
          </DebugPanel>
        </div>
      );
    } else {
      component = { provider };
    }
    return component;
  }
}
