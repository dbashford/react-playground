import styles from './style.scss';
import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';

@CSSModules(styles)
class Timer extends Component {
  componentDidMount() {
    const { increment } = this.props;
    this.interval = setInterval(increment, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const { timerState } = this.props;
    return <div styleName="timer">{timerState.get('value')}</div>;
  }
}

Timer.propTypes = {
  increment: PropTypes.func.isRequired,
  timerState: PropTypes.object.isRequired
};

export default Timer;
