import { Outlet } from "react-router-dom";
import { Appbar } from "./appbar/Appbar";
import "./Layout.scss";
export const Layout = ({ children }) => {
  return (
    <>
      <Appbar />
      <main>{children ? children : <Outlet />}</main>
    </>
  );
};
