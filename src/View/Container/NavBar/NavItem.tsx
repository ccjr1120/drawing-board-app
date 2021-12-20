import { css } from '@emotion/react';
import React from 'react';
import { NavLink } from 'react-router-dom';
import Icon from '~/components/Icon';

interface navItemProps {
  page: pageType;
}
const NavItem: React.FC<navItemProps> = React.memo(({ page, ...others }) => {
  return (
    <NavLink
      style={({ isActive }) => ({
        display: 'flex',
        justifyContent: 'space-around',
        background: isActive ? '#002152' : 'rgba(0,0,0,0)',
        height: `${64 / FONT_BASE}rem`,
        textDecoration: 'none',
        color: '#fff',
        fontSize: `${20 / FONT_BASE}rem`,
        fontWeight: 'bold',
        letterSpacing: '0.1rem',
      })}
      {...others}
      to={page.path}
    >
      <div
        css={css`
          display: flex;
          align-items: center;
        `}
      >
        <Icon
          code={page.iconCode}
          css={css`
            width: ${22 / FONT_BASE}rem;
            height: ${20 / FONT_BASE}rem;
          `}
        />
        <span>{page.label}</span>
      </div>
    </NavLink>
  );
});

export default NavItem;
