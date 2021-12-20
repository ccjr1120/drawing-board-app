import pages from '~/Pages/pages';
import { css } from '@emotion/react';
import React from 'react';
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from 'react-router-dom';
import NavBar from './NavBar';

const Container = React.memo(() => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <div
              css={css`
                height: 100%;
                width: 100%;
                overflow: hidden;
                display: grid;
                grid-template-columns: ${200 / FONT_BASE}rem calc(
                    100% - ${200 / FONT_BASE}rem
                  );
              `}
            >
              <div
                css={css`
                  background: rgb(6, 12, 38);
                `}
              >
                <NavBar pageList={pages} />
              </div>
              <main>
                <Outlet />
              </main>
            </div>
          }
        >
          <Route
            path="/"
            element={
              <Navigate
                replace
                to={pages.filter((item) => item.isDefault)[0].path || '/'}
              />
            }
          />
          {pages.map((item) => (
            <Route
              key={item.path}
              path={item.path}
              element={React.createElement(item.component)}
            />
          ))}
        </Route>
      </Routes>
    </BrowserRouter>
  );
});

export default Container;
