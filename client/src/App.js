import "./App.css";
import Catalog from "./routes/Catalog/Catalog";
import StoreLanding from "./routes/StoreLanding/StoreLanding";
import Gpc81Landing from "./routes/Gpc81Landing/Gpc81Landing";
import Root from "./root";
import Modification, {
  loader as modificationLoader,
} from "./routes/Modification/Modification";
import Orders from "./routes/Orders/Orders";
import Checkout from "./routes/Checkout/Checkout";
import StoreSelection from "./routes/StoreSelection/StoreSelection";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Success from "./routes/Success/Success";
import { HelmetProvider } from "react-helmet-async";
import { getWebConfigValue } from "guardian-common";
import { useNextGenRouting } from "./hooks/useNextGenRouting";

function storeRoutes(prefix = "") {
  return [
    { path: `${prefix}/`, element: <StoreLanding /> },
    { path: `${prefix}/catalog/:storeCode/:type`, element: <Catalog /> },
    { path: `${prefix}/catalog/:type`, element: <Catalog /> },
    { path: `${prefix}/checkout`, element: <Checkout /> },
    { path: `${prefix}/success`, element: <Success /> },
    { path: `${prefix}/orders`, element: <Orders /> },
    { path: `${prefix}/stores`, element: <StoreSelection /> },
    {
      path: `${prefix}/item/:id`,
      loader: modificationLoader,
      element: <Modification />,
    },
  ];
}

function App() {
  const useRouting = useNextGenRouting();

  const router = useRouting
    ? createBrowserRouter([
        {
          path: "/",
          element: <Root />,
          children: [
            { path: "/", element: <Gpc81Landing /> },
            ...storeRoutes("/:storeName"),
          ],
        },
      ])
    : createBrowserRouter([
        {
          path: "/",
          element: <Root />,
          children: storeRoutes(),
        },
      ]);

  return (
    <div className="main__page">
      <HelmetProvider>
        <title>{getWebConfigValue("title")}</title>
      </HelmetProvider>
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
