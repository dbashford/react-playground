import React, { Component, PropTypes } from 'react';

import { connectComponent } from './decorators';
import { setSettings } from '../actions/counter';
import RequiredNumber from './validation/RequiredNumber';

const wiring = {
  mapStateToProps: (state) => {
    return { settings: state.getIn(['count', 'settings']) };
  },
  actions: { setSettings }
};

@connectComponent(wiring)
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

  onSubmit(e) {
    e.preventDefault();
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

  handleValidation(field, test, errorMessage, clearField, event) {
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
      if (clearField || errorMessage === newState.errors[field]) {
        delete newState.errors[field];
      }
    }

    this.setState(newState);
  }

  render() {
    return (
      <form styleName="cs-container" onSubmit={this.onSubmit.bind(this)}>
        <RequiredNumber
          label="Incrementor"
          name="amount"
          value={this.state.settings.amount}
          error={this.state.errors.amount}
          handleValidation={this.handleValidation.bind(this)} />

        <RequiredNumber
          label="Interval Milliseconds"
          name="interval"
          value={this.state.settings.interval}
          error={this.state.errors.interval}
          handleValidation={this.handleValidation.bind(this)} />

        <button styleName="cs-submit">Submit</button>
      </form>
    );
  }
}
