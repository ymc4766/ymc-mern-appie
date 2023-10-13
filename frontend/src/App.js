import Footer from "./Footer/Footer";
import Main from "./Main/Main";
import Navbar from "./components/Navbar";
import HomeScreen from "./screeens/HomeScreen";
import ProductsScreen from "./screeens/ProductsScreen";
import UsersScreen from "./screeens/UsersScreen";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";

import "./styles/global.scss";
import ProductDetailScreen from "./screeens/ProductDetailScreen";
import CartScreen from "./screeens/CartScreen";
import LoginScreen from "./screeens/LoginScreen";
import RegisterScreen from "./screeens/RegisterScreen";
import ShippingScreen from "./screeens/ShippingScreen";
import PaymentScreen from "./screeens/PaymentScreen";
import PlaceOrderScreen from "./screeens/PlaceOrderScreen";
import OrderListScreen from "./screeens/OrderListScreen";
import OrderScreen from "./screeens/OrderScreen";
import ProductListScreen from "./screeens/ProductListScreen";
import ProfileScreen from "./screeens/ProfileScreen";
import ProductEditScreen from "./screeens/ProductEditScreen";

function App() {
  const Layout = () => {
    return (
      <div>
        <div className="main">
          <>
            <Navbar />
          </>

          <div className="container">
            <div className="menuContainer">
              <Main />
            </div>
            <div className="contentContainer">
              <Outlet />
            </div>
          </div>
          <Footer />
        </div>
      </div>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <HomeScreen />,
        },
        {
          path: "/users",
          element: <UsersScreen />,
        },
        {
          path: "/products",
          element: <ProductsScreen />,
        },
        {
          path: "/product/:id",
          element: <ProductDetailScreen />,
        },
        {
          path: "/cart",
          element: <CartScreen />,
        },
        {
          path: "/profile",
          element: <ProfileScreen />,
        },
        {
          path: "/shipping",
          element: <ShippingScreen />,
        },
        {
          path: "/payment",
          element: <PaymentScreen />,
        },
        {
          path: "/placeorder",
          element: <PlaceOrderScreen />,
        },
        {
          path: "/admin/product/:id/edit",
          element: <ProductEditScreen />,
        },
        {
          path: "/admin/products",
          element: <ProductListScreen />,
        },
        {
          path: "/admin/orders",
          element: <OrderListScreen />,
        },
        {
          path: `/order/:id`,
          element: <OrderScreen />,
        },
      ],
    },
    {
      path: "/login",
      element: <LoginScreen />,
    },
    {
      path: "/register",
      element: <RegisterScreen />,
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
