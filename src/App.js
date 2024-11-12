import React from "react";
import {BrowserRouter,Routes, Route } from "react-router-dom";
import Cart from "./components/cart/Cart";
import Layout from "./components/Layout";
import Home from "./components/Home";
import AddPrdouct from "./components/AddPrdouct";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/add-product" element={<AddPrdouct />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
