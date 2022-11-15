import React from "react";
import { Route, Routes } from "react-router-dom";
import Products from "./pages/Products";
import Navigation from "./components/Navigation";
import About from "./pages/About";
import { Provider } from "react-redux";
import { setupStore } from "./store/store";

const store = setupStore();

function App() {
  return (
    <>
      <Provider store={store}>
        <Navigation />
        <Routes>
          <Route path={"/products"} element={<Products />} />
          <Route path={"/about"} element={<About />}></Route>
        </Routes>
      </Provider>
    </>
  );
}

export default App;
