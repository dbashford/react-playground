import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import cssModules from 'react-css-modules';

function connectCSS(styles) {
  return function wrap(WrappedComponent) {
    return cssModules(WrappedComponent, styles);
  };
}

function connectRedux(wiring) {
  return function wrap(WrappedComponent) {
    function mapDispatchToProps(dispatch) {
      return bindActionCreators(wiring.actions, dispatch);
    }
    return connect(wiring.mapStateToProps, mapDispatchToProps)(WrappedComponent);
  };
}

export {
  connectRedux,
  connectCSS
};