import React, { Component } from 'react';
import { Router, Route, IndexRoute } from 'react-router';

import Counter from '../components/Counter';
import CounterSettings from '../components/CounterSettings';

export default class App extends Component {
  render() {
    return (
      <Router>
        <Route path="/">
          <IndexRoute component={Counter} />
          <Route path="settings" component={CounterSettings}/>
        </Route>
      </Router>
    );
  }
}
