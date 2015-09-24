import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import { increment, decrement } from '../actions/counter';
import { connectRedux, connectCSS } from './decorators';
import styles from './style.scss';

const redux = {
  mapStateToProps: (state) => {
    return {
      count: state.getIn(['count', 'count']),
      settings: state.getIn(['count', 'settings']),
    };
  },
  actions: { increment, decrement }
};

@connectRedux(redux)
@connectCSS(styles)
export default class Counter extends Component {

  static propTypes = {
    count: PropTypes.number.isRequired,
    settings: PropTypes.object.isRequired,
    increment: PropTypes.func.isRequired,
    decrement: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);

    // avoid rebind for every rerender
    this.toggleTimer = this.toggleTimer.bind(this);
    this.state = {
      interval: undefined
    };
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
    if (this.state.interval) {
      clearInterval(this.state.interval);
      this.setState({ interval: undefined });
    }
  }

  toggleTimer() {
    if (this.state.interval) {
      this.clearTimer();
    } else {
      this.timer();
    }
  }

  timer(interval = this.props.settings.get('interval')) {
    this.clearTimer();
    const ps = this.props;
    const intervalId = setInterval(
      (ps.settings.get('isIncrement')) ? ps.increment : ps.decrement, interval);
    this.setState({ interval: intervalId });
  }

  render() {
    const buttonText = this.state.interval ? 'Stop Timer' : 'Start Timer';
    return (
      <div styleName="c-container">
        <h1>Count</h1>
        <div styleName="large">{this.props.count}</div>
        <div styleName="button-container">
          <button styleName="c-button-start-stop" onClick={this.toggleTimer}>
            {buttonText}
          </button>
        </div>
        <Link to={`/settings`}>Edit Counter Settings</Link>
      </div>
    );
  }
}
