import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { increment, decrement, setSettings } from '../actions/counter';

import cssModules from 'react-css-modules';
import styles from './style.scss';

function createDecorator(mapStateToProps, actions) {
  return function initialize() {
    return function wrap(WrappedComponent) {
      function mapDispatchToProps(dispatch) {
        return bindActionCreators(actions, dispatch);
      }
      const returnedComponent = cssModules(WrappedComponent, styles);
      return connect(mapStateToProps, mapDispatchToProps)(returnedComponent);
    };
  };
}

const initializeCounter = createDecorator(
  (state) => {
    return {
      count: state.getIn(['count', 'count']),
      settings: state.getIn(['count', 'settings']),
    };
  },
  { increment, decrement }
);

const initializeSettings = createDecorator(
  (state) => {
    return { settings: state.getIn(['count', 'settings']) }
  },
  { setSettings }
);

export {
  initializeCounter,
  initializeSettings
};
