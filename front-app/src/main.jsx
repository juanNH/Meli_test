import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { LazyLoad, Layout } from "./components/layout";
import "./styles/main.scss";
import { interceptor } from "./services/interceptors/authorSignature";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: LazyLoad(() => import("./pages/Page")),
      },
      {
        path: "/items",
        element: LazyLoad(() => import("./pages/items/Page")),
      },
      {
        path: "/items/:id",
        element: LazyLoad(() => import("./pages/items/[id]/Page")),
      },
    ],
  },
]);
interceptor();
ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
