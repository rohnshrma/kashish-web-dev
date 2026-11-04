import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import About from "./pages/About";
import Products from "./pages/Products";
import ProductDetail, { productLoader } from "./pages/ProductDetail";
import Contact, { contactAction } from "./pages/Contact";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Unauthorized from "./pages/Unauthorized";
import NotFound from "./pages/NotFound";
import ErrorPage from "./pages/ErrorPage";

// The whole route table in ONE place.
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, // shell: navbar + <Outlet />
    errorElement: <ErrorPage />, // catches errors from any child
    children: [
      { index: true, element: <Home /> }, // "/"
      { path: "about", element: <About /> }, // "/about"
      {
        path: "products", // nested: "/products"
        children: [
          { index: true, element: <Products /> },
          // dynamic segment :id + loader
          { path: ":id", element: <ProductDetail />, loader: productLoader },
        ],
      },
      { path: "contact", element: <Contact />, action: contactAction },
      { path: "login", element: <Login /> },
      { path: "unauthorized", element: <Unauthorized /> },

      // PRIVATE: logged-in users only. Pathless route = guard only.
      {
        element: <ProtectedRoute />,
        children: [{ path: "dashboard", element: <Dashboard /> }],
      },
      // PRIVATE + ROLE: admins only. `lazy` loads the page on demand.
      {
        element: <ProtectedRoute role="admin" />,
        children: [
          {
            path: "admin",
            lazy: async () => ({ Component: (await import("./pages/Admin")).default }),
          },
        ],
      },

      { path: "*", element: <NotFound /> }, // 404 catch-all
    ],
  },
]);

export default router;
