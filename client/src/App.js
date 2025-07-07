import "./App.css";
import Catalog from "./routes/Catalog/Catalog";
import Landing from "./routes/Landing/Landing";
import LandingV2 from "./routes/LandingV2/Landing";
import Root from "./routes/root";
import Modification, {
  loader as modificationLoader,
} from "./routes/Modification/Modification";
import Orders from "./routes/Orders/Orders";
import Checkout from "./routes/Checkout/Checkout";
import StoreSelection from "./routes/StoreSelection/StoreSelection";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Success from "./routes/Success/success";
import { Helmet } from "react-helmet";
import { getWebConfigValue } from "guardian-common";
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
          { path: "/catalog/:storeCode/:type", element: <Catalog /> },
          { path: "/catalog/:type", element: <Catalog /> },
          { path: "/checkout", element: <Checkout /> },
          { path: "/success", element: <Success /> },
          { path: "/orders", element: <Orders /> },
          { path: "/stores", element: <StoreSelection /> },
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
          {
            path: "/:storeName/catalog/:storeCode/:type",
            element: <Catalog />,
          },
          { path: "/:storeName/catalog/:type", element: <Catalog /> },
          { path: "/:storeName/checkout", element: <Checkout /> },
          { path: "/:storeName/success", element: <Success /> },
          { path: "/:storeName/orders", element: <Orders /> },
          { path: "/:storeName/stores", element: <StoreSelection /> },
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
        <title>{getWebConfigValue("title")}</title>
      </Helmet>
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
