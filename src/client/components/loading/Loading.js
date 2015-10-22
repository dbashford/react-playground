import React, { Component } from 'react';
import { connectCSS } from '../../helpers/decorators';
import styles from './loading.scss';

@connectCSS(styles)
export default class Loading extends Component {
  render() {
    return (
      <div>Loading</div>
    );
  }
}
