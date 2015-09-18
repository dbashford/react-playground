import React, { Component, PropTypes } from 'react';
import { initializeSettings } from './decorators';

function isNumber(val) {
  return val.length > 0 && isNaN(val);
}

function isPresent(val) {
  return val.length === 0;
}

@initializeSettings()
export default class CounterSettings extends Component {

  static propTypes = {
    settings: PropTypes.object.isRequired,
    setSettings: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      settings: props.settings.toJS(),
      errors: {}
    };
  }

  onSubmit() {
    if (Object.keys(this.state.errors).length === 0) {
      const settings = this.state.settings;
      // need ints
      settings.interval = parseInt(settings.interval, 10);
      settings.amount = parseInt(settings.amount, 10);

      // call redux store
      this.props.setSettings(settings);
      this.props.history.pushState(null, '/');
    }
  }

  handleValidation(field, test, errorMessage, event) {
    const val = event.target.value;
    const newState = this.state;
    newState.settings[field] = val;

    // msg means property is invalid, set message
    if (test(val)) {
      newState.errors = this.state.errors;
      newState.errors[field] = errorMessage;
    } else if (this.state.errors[field]) {
      // is valid, but has existing message, remove message
      newState.errors = this.state.errors;
      if (errorMessage === newState.errors[field]) {
        delete newState.errors[field];
      }
    }

    this.setState(newState);
  }

  render() {
    const amountValidation = this.handleValidation.bind(this, 'amount', isNumber, 'Amount must be a number.');
    const amountPresentValidation = this.handleValidation.bind(this, 'amount', isPresent, 'Amount must be provided.');

    const intervalValidation = this.handleValidation.bind(this, 'interval', isNumber, 'Interval must be a number.');
    const intervalPresentValidation = this.handleValidation.bind(this, 'interval', isPresent, 'Interval Milliseconds must be provided.');

    return (
      <form styleName="container" onSubmit={this.onSubmit.bind(this)}>

        <div>
          <label>Incrementor</label>
          <input
            type="text"
            value={this.state.settings.amount}
            onChange={amountValidation}
            onBlur={amountPresentValidation}
          />
          {this.state.errors.amount}
        </div>

        <div>
          <label>Interval Milliseconds</label>
          <input
            type="text"
            value={this.state.settings.interval}
            onChange={intervalValidation}
            onBlur={intervalPresentValidation}
          />
          {this.state.errors.interval}
        </div>

        <button>Submit</button>

      </form>
    );
  }
}
