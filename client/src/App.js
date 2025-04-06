import "./App.css";
import Catalog from "./routes/Catalog/Catalog";
import Landing from "./routes/Landing/Landing";
import LandingV2 from "./routes/LandingV2/Landing";
import Root from "./routes/root";
import Modification, {
  loader as modificationLoader,
} from "./routes/Modification/Modification";
import Cart from "./routes/Cart/Cart";
import Orders from "./routes/Orders/Orders";
import Checkout from "./routes/Checkout/Checkout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Success from "./routes/Success/Success";
import { Helmet } from "react-helmet";
import { getConfigValue } from "./lib/config";
import { useNextGenRouting } from "./hooks/useNextGenRouting";

function App() {
  const useRouting = useNextGenRouting();
  let router;
  if (!useRouting) {
    router = createBrowserRouter([
      {
        path: "/",
        element: <Root />,
        children: [
          {
            path: "/",
            element: <Landing />,
          },
          { path: "/catalog/:type", element: <Catalog /> },
          { path: "/cart", element: <Cart /> },
          { path: "/checkout", element: <Checkout /> },
          { path: "/success", element: <Success /> },
          { path: "/orders", element: <Orders /> },
          {
            path: "/item/:id",
            loader: modificationLoader,
            element: <Modification />,
          },
        ],
      },
    ]);
  } else {
    router = createBrowserRouter([
      {
        path: "/",
        element: <Root />,
        children: [
          {
            path: "/",
            element: <LandingV2 />,
          },
          {
            path: "/:storeName",
            element: <Landing />,
          },
          { path: "/:storeName/catalog/:type", element: <Catalog /> },
          { path: "/:storeName/cart", element: <Cart /> },
          { path: "/:storeName/checkout", element: <Checkout /> },
          { path: "/:storeName/success", element: <Success /> },
          { path: "/:storeName/orders", element: <Orders /> },
          {
            path: "/:storeName/item/:id",
            loader: modificationLoader,
            element: <Modification />,
          },
        ],
      },
    ]);
  }

  return (
    <div className="main__page">
      <Helmet>
        <title>{getConfigValue("title")}</title>
      </Helmet>
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
