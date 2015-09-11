import styles from './style.scss';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';

class App extends Component {
  render() {
    return (
      <h1 className={styles.bg}>HELLO WORLD</h1>
    );
  }
}

ReactDOM.render(<App />, document.body);
