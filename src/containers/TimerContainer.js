import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Timer from '../components/Timer';
import * as TimerActions from '../actions/timer';

// Which part of the ***Redux global state*** does our component want to receive as props?
function mapStateToProps(state) {
  return {
    timerState: state.get('timer')
  };
}

// Which action creators does it want to receive by props?
function mapDispatchToProps(dispatch) {
  return bindActionCreators(TimerActions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Timer);
