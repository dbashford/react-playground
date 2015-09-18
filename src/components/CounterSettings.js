import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { newAmount } from '../actions/counter';

import CSSModules from 'react-css-modules';
import styles from './style.scss';

function isNumber(val) {
  return val.length > 0 && isNaN(val);
}

function isPresent(val) {
  return val.length === 0;
}

@connect(
  state => {
    return { amount: state.get('counter').get('amount') };
  },
  dispatch => bindActionCreators({newAmount}, dispatch))
@CSSModules(styles)
class CounterForm extends Component {

  static propTypes = {
    amount: PropTypes.number.isRequired,
    newAmount: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      amount: props.amount,
      errors: {}
    };
  }

  onSubmit() {
    if (Object.keys(this.state.errors).length === 0) {
      // push to redux store
      this.props.newAmount(parseInt(this.state.amount, 10));
      this.props.history.pushState(null, '/');
    }
  }

  handleValidation(field, test, errorMessage, event) {
    const val = event.target.value;
    const newState = {
      [field]: val
    };

    // msg means property is invalid, set message
    if (test(val)) {
      newState.errors = this.state.errors;
      newState.errors.amount = errorMessage;
    } else if (this.state.errors[field]) {
      // is valid, but has existing message, remove message
      newState.errors = this.state.errors;
      delete newState.errors[field];
    }

    this.setState(newState);
  }

  render() {
    const amountValidation = this.handleValidation.bind(this, 'amount', isNumber, 'Amount must be a number.');
    const presentValidation = this.handleValidation.bind(this, 'amount', isPresent, 'Amount must be provided.');

    return (
      <form styleName="container" onSubmit={this.onSubmit.bind(this)}>

        <div>
          <label>Incrementor</label>
          <input
            type="text"
            value={this.state.amount}
            onChange={amountValidation}
            onBlur={presentValidation}
          />
          {this.state.errors.amount}
        </div>

        <button>Submit</button>

      </form>
    );
  }
}

export default CounterForm;
