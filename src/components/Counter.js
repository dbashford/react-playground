import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as CounterActions from '../actions/counter';

import CSSModules from 'react-css-modules';
import styles from './style.scss';

@connect(
  state => {
    return { count: state.get('counter').get('count') };
  },
  dispatch => bindActionCreators(CounterActions, dispatch)
)
@CSSModules(styles)
class Counter extends Component {
  static propTypes = {
    increment: PropTypes.func.isRequired,
    count: PropTypes.number.isRequired
  }

  componentDidMount() {
    const { increment } = this.props;
    this.interval = setInterval(increment, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <div styleName="container">
        <h1>Count</h1>
        <div styleName="large">{this.props.count}</div>
        <Link to={`/settings`}>Edit Counter Settings</Link>
      </div>
    );
  }
}

export default Counter;
