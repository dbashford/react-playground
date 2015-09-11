import styles from './style.scss';
import React, {Component} from 'react';

console.log(styles)

class App extends Component {
  render() {
    return (
      <h1 className={styles.bg}>HELLO WORLD</h1>
    );
  }
}

React.render(<App />, document.body);
