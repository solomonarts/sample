import React from "react";
import Header from "./header";
import Home from "../pages/home";
import Footer from "./Footer/Footer";
import { Route, Routes, useLocation } from "react-router-dom";
import Products from "../pages/products";
import AboutUs from "../pages/about";
import Contact from "../pages/contact";
import Reseller from "../pages/reseller";
import Signup from "../pages/signup/Signup";
import Orders from "../pages/orders/Orders";
import PrivateRoute from "../PrivateRoute";
import Maindash from "../pages/dashboard/Maindash";

function Content() {
  const pageLocation = useLocation();
  // console.log("location", pageLocation);
  return (
    <div className="relative overflow-hidden">
      {pageLocation.pathname !== "/dashboard" && <Header />}
      <div className="relative mt-[-70px]">
        <Routes>
          <Route path="" element={<Home />} />
          <Route path="products" element={<Products />} />
          <Route path="about" element={<AboutUs />} />
          <Route path="contact" element={<Contact />} />
          <Route path="reseller" element={<Reseller />} />
          <Route path="/sign-up" element={<Signup />} />
          <Route path="/order-now" element={<Orders />} />
          <Route path="*" element={<Home />} />
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Maindash />} />
          </Route>
        </Routes>
      </div>

      <Footer />
    </div>
  );
}

export default Content;
