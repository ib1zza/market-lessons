import React from "react";
import { Route, Routes } from "react-router-dom";
import Products from "./pages/Products";
import Navigation from "./components/Navigation/Navigation";
import About from "./pages/About";
import { Provider } from "react-redux";
import { setupStore } from "./store/store";
import ProductPage from "./pages/ProductPage";
import FavouritesPage from "./pages/FavouritesPage";
import CartPage from "./pages/CartPage";
import { AppRoutes } from "./types/routes";
import HomePage from "./pages/HomePage";
import Wrapper from "./UI/Wrapper";
import Footer from "./components/Footer/Footer";

const store = setupStore();

function App() {
  return (
    <Provider store={store}>
      <Navigation />
      <Wrapper>
        <Routes>
          <Route path={AppRoutes.homePage} element={<HomePage />} />
          <Route path={AppRoutes.allProductsPage} element={<Products />} />
          <Route path={AppRoutes.aboutPage} element={<About />} />
          <Route path={AppRoutes.productPage} element={<ProductPage />} />
          <Route path={AppRoutes.favouritesPage} element={<FavouritesPage />} />
          <Route path={AppRoutes.cartPage} element={<CartPage />} />
        </Routes>
      </Wrapper>
      <Footer />
    </Provider>
  );
}

export default App;
