import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/auth/Layout";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

import AdminLayout from "./components/admin-view/AdminLayout";
import Dashboard from "./pages/admin-view/Dashboard";
import Features from "./pages/admin-view/Features";
import Orders from "./pages/admin-view/Orders";
import Products from "./pages/admin-view/Products";

import NotFound from "./pages/not-found/NotFound";

import ShoppingLayout from "./components/shopping-view/ShoppingLayout";
import ShoppingHome from "./pages/shopping-view/ShoppingHome";
import ShopAccount from "./pages/shopping-view/ShopAccount";
import CheckOut from "./pages/shopping-view/CheckOut";
import ShopListing from "./pages/shopping-view/ShopListing";

import CheckAuth from "./components/common/CheckAuth";
import UnAuth from "./pages/Un-auth-page/UnAuth";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth } from "./store/auth-slice";
import { Skeleton } from "./components/ui/skeleton";

function App() {
  // const user=null;
  // const isAuthenticated=false;

  const { user, isAuthenticated, isLoading } = useSelector(
    (state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);
  if (isLoading) return <Skeleton className="w-[800] bg-black h-[600px]" />;

  return (
    <div className="flex flex-col overflow-hidden bg-white">
      {/* render common components */}
      {/* <h1>headdd</h1> */}
      <Routes>
        <Route
          path="/auth"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <Layout />
            </CheckAuth>
          }
        >
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>

        <Route
          path="/admin"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AdminLayout />
            </CheckAuth>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="features" element={<Features />} />
          <Route path="orders" element={<Orders />} />
          <Route path="products" element={<Products />} />
        </Route>

        <Route
          path="/shop"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <ShoppingLayout />
            </CheckAuth>
          }
        >
          <Route path="home" element={<ShoppingHome />} />
          <Route path="shop-account" element={<ShopAccount />} />
          <Route path="checkout" element={<CheckOut />} />
          <Route path="listing" element={<ShopListing />} />
        </Route>
        <Route path="*" element={<NotFound />}></Route>
        <Route path="/unauth-page" element={<UnAuth />}></Route>
      </Routes>
    </div>
  );
}

export default App;
