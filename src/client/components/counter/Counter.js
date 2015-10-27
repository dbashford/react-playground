import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import { updateCount } from '../../actions/';
import { connectRedux, connectCSS } from '../../helpers/decorators';
import styles from './counter.scss';

const redux = {
  mapStateToProps: (state) => {
    return {
      count: state.count.get('count'),
      settings: state.count.get('settings')
    };
  },
  actions: { updateCount }
};

@connectRedux(redux)
@connectCSS(styles)
export default class Counter extends Component {

  static propTypes = {
    count: PropTypes.number.isRequired,
    settings: PropTypes.object.isRequired,
    updateCount: PropTypes.func.isRequired,
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
    const intervalId = setInterval(ps.updateCount, interval);
    this.setState({ interval: intervalId });
  }

  render() {
    const buttonText = this.state.interval ? 'Stop Timer' : 'Start Timer';
    const buttonClass = this.state.interval ? 'c-button-stop' : 'c-button-start';
    return (
      <div styleName="c-container" className="counter-container">
        <h1>Count</h1>
        <div styleName="c-number-container">{this.props.count}</div>
        <div className="button-container">
          <button styleName={buttonClass} onClick={this.toggleTimer}>
            {buttonText}
          </button>
        </div>
        <Link to={`/settings`}>Edit Counter Settings</Link>
      </div>
    );
  }
}
