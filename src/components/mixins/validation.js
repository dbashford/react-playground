import React, { PropTypes } from 'react';
import classnames from 'classnames';

export const validationPropTypes = {
  updateField: PropTypes.func,
  submitForm: PropTypes.func,
  errors: PropTypes.object,
  validate: PropTypes.func,
  isValid: PropTypes.func,
  getValidationMessages: PropTypes.func,
  clearValidations: PropTypes.func,
  handleValidation: PropTypes.func
};

export const validationMixin = {

  getValidatorData() {
    return this.props;
  },

  renderHelpText(message) {
    return (
      <span className="help-block">{message}</span>
    );
  },

  getClasses(field) {
    return classnames({
      'form-group': true,
      'has-error': !this.props.isValid(field)
    });
  },

  onChange(field) {
    return event => {
      const value = event.target.value;
      this.props.updateField(field, value);
    };
  },

  onSubmit(event) {
    event.preventDefault();
    const onValidate = error => {
      if (!error) {
        this.props.submitForm();
      }
    };
    this.props.validate(onValidate);
  }
};
