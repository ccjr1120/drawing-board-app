import React, { useEffect } from 'react';
import { css, SerializedStyles } from '@emotion/react';
import tools from './tools';
import Icon from '~/components/Icon';
interface toolbarProps {
  value?: Home.toolType;
  onChange: (value: Home.toolType) => void;
  inheritCss?: SerializedStyles;
}
const ToolBar: React.FC<toolbarProps> = React.memo(
  ({ value, onChange, inheritCss }) => {
    useEffect(() => {
      if (!value) {
        onChange(tools[0]);
      }
    }, [value, onChange]);
    return (
      <div
        css={css`
          border: 1px solid rgba(0, 0, 0, 0.4);
          border-radius: 6px;
          text-align: center;
          > div {
            cursor: pointer;
            background: rgba(0, 0, 0, 0.1);
            padding: 8px 8px;
            margin: 4px;
          }
          ${inheritCss}
        `}
      >
        {tools.map((item) => (
          <div
            css={css`
              padding: 4px;
              background: rgba(0, 0, 0, 0.2);
            `}
            key={item.name}
            onClick={() => {
              onChange(item);
            }}
          >
            <Icon
              code={item.iconCode}
              color={value?.name === item.name ? 'orange' : 'black'}
              css={css`
                width: ${24 / FONT_BASE}rem;
                height: ${24 / FONT_BASE}rem; ;
              `}
            />
          </div>
        ))}
      </div>
    );
  }
);

export default ToolBar;
