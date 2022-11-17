import React from "react";
import { Route, Routes } from "react-router-dom";
import Products from "./pages/Products";
import Navigation from "./components/Navigation";
import About from "./pages/About";
import { Provider } from "react-redux";
import { setupStore } from "./store/store";
import ProductPage from "./pages/ProductPage";
import LikesPage from "./pages/LikesPage";

const store = setupStore();

function App() {
  return (
    <Provider store={store}>
      <Navigation />
      <Routes>
        <Route path={"/products"} element={<Products />} />
        <Route path={"/about"} element={<About />} />
        <Route path={"/products/:id"} element={<ProductPage />} />
        <Route path={"/likes"} element={<LikesPage />} />
      </Routes>
    </Provider>
  );
}

export default App;
