import React from 'react';
import Container from './Container';
import Styles from './Styles';

const View = React.memo(() => (
  <React.Fragment>
    <Styles />
    <Container />
  </React.Fragment>
));

export default View;
