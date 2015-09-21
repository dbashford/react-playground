import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import cssModules from 'react-css-modules';
import localStyles from './style.scss';

function connectComponent(wiring, styles = localStyles) {
  return function wrap(WrappedComponent) {
    function mapDispatchToProps(dispatch) {
      return bindActionCreators(wiring.actions, dispatch);
    }
    const returnedComponent = cssModules(WrappedComponent, styles);
    return connect(wiring.mapStateToProps, mapDispatchToProps)(returnedComponent);
  };
}

export {
  connectComponent
};
