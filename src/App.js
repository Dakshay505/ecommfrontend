import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

import Header from "./components/layout/Header/header.js";
import Footer from "./components/layout/Footer/footer.js";
import Home from "./components/layout/Home/home.js";
import ProductDetails from "./components/product/ProductDetails.js";
import Products from "./components/product/Products.js";
import Search from "./components/product/Search.js";
import UserOptions from "./components/layout/Header/UserOptions.js";
import LoginSignUp from "./components/User/LoginSignUp";
import Profile from "./components/User/Profile.js";
import UpdateProfile from "./components/User/UpdateProfile.js";
import UpdatePassword from "./components/User/UpdatePassword.js";
import ForgotPassword from "./components/User/ForgotPassword.js";
import ResetPassword from "./components/User/ResetPassword.js";
import Cart from "./components/Cart/Cart.js";
import Shipping from "./components/Cart/Shipping.js";
import ConfirmOrder from "./components/Cart/ConfirmOrder.js";
import Payment from "./components/Cart/Payment.js";
import OrderSuccess from "./components/Cart/OrderSuccess.js";
import MyOrders from "./components/Order/MyOrders.js";
import OrderDetails from "./components/Order/OrderDetails.js";
import DashBoard from "./components/Admin/DashBoard.js"
import ProductList from "./components/Admin/ProductList.js"
import NewProduct from "./components/Admin/NewProduct.js"
import UpdateProduct from "./components/Admin/UpdateProduct.js"
import OrderList from "./components/Admin/OrderList.js"
import ProcessOrder from "./components/Admin/ProcessOrder.js"
import UsersList from "./components/Admin/UsersList.js"
import UpdateUser from "./components/Admin/UpdateUser.js"
import ProductReviews from "./components/Admin/ProductReviews.js"

import WebFont from "webfontloader";
import React from "react";
import store from "./store";
import { loadUser } from "./actions/userAction";
import { useSelector } from "react-redux";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import ProtectedRoute from "./components/Route/ProtectedRoute";
function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");

    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });

    store.dispatch(loadUser());

    getStripeApiKey();
  }, []);
  return (
    <>
      <BrowserRouter>
        <Header />
        {isAuthenticated && <UserOptions user={user} />}
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/product/:id" element={<ProductDetails />} />
          <Route exact path="/products" element={<Products />} />
          <Route path="/products/:keyword" element={<Products />} />
          <Route exact path="/search" element={<Search />} />
          <Route exact path="/login" element={<LoginSignUp />} />
          <Route
            exact
            path="/account"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/me/update"
            element={
              <ProtectedRoute>
                <UpdateProfile />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/password/update"
            element={
              <ProtectedRoute>
                <UpdatePassword />
              </ProtectedRoute>
            }
          />
          <Route exact path="/password/forgot" element={<ForgotPassword />} />
          <Route
            exact
            path="/password/reset/:token"
            element={<ResetPassword />}
          />
          <Route exact path="/cart" element={<Cart />} />
          <Route
            exact
            path="/login/shipping"
            element={
              <ProtectedRoute>
                <Shipping />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/order/confirm"
            element={
              <ProtectedRoute>
                <ConfirmOrder />
              </ProtectedRoute>
            }
          />
          {stripeApiKey && ( 
              <Route
                exact
                path="/payment/process"
                element={ <Elements stripe={loadStripe(stripeApiKey)}>
                  <ProtectedRoute>
                    <Payment />
                  </ProtectedRoute>
                  </Elements>
                }
              />
          )}
          <Route
            exact
            path="/success"
            element={
              <ProtectedRoute>
                <OrderSuccess />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/orders"
            element={
              <ProtectedRoute>
                <MyOrders />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/order/:id"
            element={
              <ProtectedRoute>
                <OrderDetails />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <DashBoard isAdmin={true}/>
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/admin/products"
            element={
              <ProtectedRoute>
                <ProductList isAdmin={true}/>
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/admin/product"
            element={
              <ProtectedRoute>
                <NewProduct isAdmin={true}/>
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/admin/product/:id"
            element={
              <ProtectedRoute>
                <UpdateProduct isAdmin={true}/>
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/admin/orders"
            element={
              <ProtectedRoute>
                <OrderList isAdmin={true}/>
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/admin/order/:id"
            element={
              <ProtectedRoute>
                <ProcessOrder isAdmin={true}/>
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/admin/users"
            element={
              <ProtectedRoute>
                <UsersList isAdmin={true}/>
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/admin/user/:id"
            element={
              <ProtectedRoute>
                <UpdateUser isAdmin={true}/>
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/admin/reviews"
            element={
              <ProtectedRoute>
                <ProductReviews isAdmin={true}/>
              </ProtectedRoute>
            }
          />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
