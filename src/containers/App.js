import React, { Component, PropTypes } from 'react';
import { Router, Route, IndexRoute } from 'react-router';

import { initializeApp } from '../actions';
import { connectRedux } from '../helpers/decorators';
import Counter from '../components/counter/Counter';
import CounterSettings from '../components/settings/Settings';
import Loading from '../components/loading/Loading';

@connectRedux()
export default class App extends Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    initializeApp(dispatch, () => {
      this.setState({ loading: false });
    });
  }

  render() {
    const isLoading = this.state.loading;
    return (
      <div>
        {isLoading &&
          <Loading />
        }
        {!isLoading &&
          <Router>
            <Route path="/">
              <IndexRoute component={Counter} />
              <Route path="settings" component={CounterSettings}/>
            </Route>
          </Router>
        }
      </div>
    );
  }
}
