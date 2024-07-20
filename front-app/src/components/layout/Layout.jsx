import { Outlet } from "react-router-dom";
import { Appbar } from "./appbar/Appbar";
import "./Layout.scss";
export const Layout = ({ children }) => {
  return (
    <>
      <Appbar />
      <main>{children ? children : <Outlet />}</main>
      <footer>
        <p>Repositorio: <a href="https://github.com/juanNH/Meli_test" target="_blank"alt="Github">Github</a></p>
      </footer>
    </>
  );
};
