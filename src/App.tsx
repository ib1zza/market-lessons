import React, { useEffect, useState } from "react";
import "./App.css";
import Product from "./components/Product";
import { useProducts } from "./hooks/products";
import { Route, Routes } from "react-router-dom";
import Products from "./pages/Products";
import Navigation from "./components/Navigation";
import About from "./pages/About";

function App() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path={"/products"} element={<Products />} />
        <Route path={"/about"} element={<About />}></Route>
      </Routes>
    </>
  );
}

export default App;
