import { css, Global } from '@emotion/react';
import React from 'react';

const Styles = React.memo(() => (
  <Global
    styles={css`
      html,
      body {
        margin: 0;
        padding: 0;
        height: 100%;
        width: 100%;
      }
    `}
  />
));

export default Styles;
