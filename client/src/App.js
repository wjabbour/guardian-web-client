import './App.css';
import Catalog from './routes/Catalog/Catalog';
import Landing from './routes/Landing/landing';
import Root from './routes/root';
import Modification, { loader as modificationLoader } from '../src/routes/Modification/modification'
import Cart from './routes/Cart/cart';
import Orders from './routes/Orders/Orders'
import Checkout from './routes/Checkout/checkout';
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import Success from './routes/Success/success';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Root />,
      children: [
        { index: true, element: <Landing /> },
        { path: '/catalog/:type', element: <Catalog /> },
        { path: '/cart', element: <Cart /> },
        { path: '/checkout', element: <Checkout /> },
        { path: '/success', element: <Success /> },
        { path: '/orders', element: <Orders /> },
        { path: '/item/:id', loader: modificationLoader, element: <Modification /> },
      ]
    }
  ]);

  return (
    <div className='main__page'>
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
