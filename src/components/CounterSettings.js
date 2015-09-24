import React, { Component, PropTypes } from 'react';

import { setSettings } from '../actions/counter';
import { connectRedux, connectCSS } from './decorators';
import RequiredNumber from './validation/RequiredNumber';
// import makeFormComponent from './validation/decorator';

import styles from './style.scss';

const redux = {
  mapStateToProps: (state) => {
    return { settings: state.getIn(['count', 'settings']) };
  },
  actions: { setSettings }
};

// @makeFormComponent
@connectRedux(redux)
@connectCSS(styles)
export default class CounterSettings extends Component {

  static propTypes = {
    settings: PropTypes.object.isRequired,
    setSettings: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      fields: props.settings.toJS(),
      errors: {}
    };
  }

  onSubmit(e) {
    e.preventDefault();
    if (Object.keys(this.state.errors).length === 0) {
      const settings = this.state.fields;
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
    newState.fields[field] = val;

    if (test(val)) {
      // set error
      newState.errors = this.state.errors;
      newState.errors[field] = errorMessage;
    } else if (this.state.errors[field]) {
      newState.errors = this.state.errors;
      if (clearField || errorMessage === newState.errors[field]) {
        // is valid, but 1) has existing message or 2) needs to be cleared entirely
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
          value={this.state.fields.amount}
          error={this.state.errors.amount}
          handleValidation={this.handleValidation.bind(this)}
          />

        <RequiredNumber
          label="Interval Milliseconds"
          name="interval"
          value={this.state.fields.interval}
          error={this.state.errors.interval}
          handleValidation={this.handleValidation.bind(this)}
          />

        <button styleName="cs-submit">Submit</button>
      </form>
    );
  }
}
