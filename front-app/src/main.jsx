import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { LazyLoad, Layout } from "./components/layout";
import "./styles/main.scss";
import { interceptor } from "./services/interceptors/authorSignature";
import { NotFound } from "./pages/NotFound";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: (
      <Layout>
        <NotFound />
      </Layout>
    ),
    children: [
      {
        path: "/",
        element: LazyLoad(() => import("./pages/PageHome")),
      },
      {
        path: "/items",
        element: LazyLoad(() => import("./pages/items/PageItems")),
      },
      {
        path: "/items/:id",
        element: LazyLoad(() => import("./pages/items/[id]/PageItemId")),
      },
    ],
  },
]);
interceptor();
ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
