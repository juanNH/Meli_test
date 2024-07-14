import { Outlet } from 'react-router-dom';
import {Appbar} from './appbar/Appbar';
import './Layout.scss';
export const Layout = () => {
  return (
    <>
      <Appbar />
      <main>
        <Outlet />
      </main>
    </>
  );
};
