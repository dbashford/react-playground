import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import cssModules from 'react-css-modules';

function connectCSS(styles, options = {}) {
  return function wrap(WrappedComponent) {
    return cssModules(WrappedComponent, styles, options);
  };
}

function connectRedux(wiring = {}) {
  return function wrap(WrappedComponent) {
    function mapDispatchToProps(dispatch) {
      const actions = wiring.actions || {};
      // always toss dispatch in so it is available on props
      actions.dispatch = dispatch;
      return bindActionCreators(actions, dispatch);
    }
    return connect(wiring.mapStateToProps, mapDispatchToProps)(WrappedComponent);
  };
}

export {
  connectRedux,
  connectCSS
};
