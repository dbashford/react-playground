import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { increment, decrement } from '../actions/counter';

import CSSModules from 'react-css-modules';
import styles from './style.scss';

function mapStateToProps(state) {
  return {
    count: state.getIn(['count', 'count']),
    settings: state.getIn(['count', 'settings']),
  };
}

@connect(
  mapStateToProps,
  dispatch => bindActionCreators({ increment, decrement }, dispatch))
@CSSModules(styles)
class Counter extends Component {

  static propTypes = {
    count: PropTypes.number.isRequired,
    settings: PropTypes.object.isRequired,
    increment: PropTypes.func.isRequired,
    decrement: PropTypes.func.isRequired
  }

  componentDidMount() {
    this.timer();
  }

  componentWillUpdate(nextProps) {
    const currInterval = this.props.settings.get('interval');
    const newInterval = nextProps.settings.get('interval');
    if (currInterval !== newInterval) {
      this.timer(newInterval);
    }
  }

  componentWillUnmount() {
    this.clearTimer();
  }

  clearTimer() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  timer(interval = this.props.settings.get('interval')) {
    this.clearTimer();
    const ps = this.props;
    this.interval = setInterval(
      (ps.settings.get('isIncrement')) ? ps.increment : ps.decrement, interval);
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
