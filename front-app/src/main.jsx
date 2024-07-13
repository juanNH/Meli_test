import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { LazyLoad, Appbar } from "./components/layout";
import './styles/main.scss';
const router = createBrowserRouter([
  {
    path: "/",
    element: LazyLoad(() => import("./pages/Page")),
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <Appbar>
    <RouterProvider router={router} />
  </Appbar>
);
