import "./App.css";
import Catalog from "./routes/Catalog/Catalog";
import Landing from "./routes/Landing/Landing";
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

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        { index: true, element: <Landing /> },
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
