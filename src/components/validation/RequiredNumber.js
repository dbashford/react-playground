import React, { Component, PropTypes } from 'react';

function isNumber(val) {
  return val.length > 0 && isNaN(val);
}

function isPresent(val) {
  return val.length === 0;
}

export default class RequiredNumber extends Component {

  static propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    value: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number
    ]).isRequired,
    error: PropTypes.string,
    handleValidation: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this.amountValidation = this.validate.bind(
      this, props.name, isNumber, props.label + ' must be a number.', true);
    this.amountPresentValidation = this.validate.bind(
      this, props.name, isPresent, props.label + ' must be provided.', false);
  }

  validate(field, test, errorMessage, clearField, event) {
    this.props.handleValidation(field, test, errorMessage, clearField, event);
  }

  render() {
    return (
      <div>
        <label>{this.props.label}</label>
        <input
          type="text"
          value={this.props.value}
          onChange={this.amountValidation}
          onBlur={this.amountPresentValidation}
        />
        {this.props.error}
      </div>
    );
  }
}
