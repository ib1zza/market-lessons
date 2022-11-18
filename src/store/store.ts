import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/UserSlice";
import productsReducer from "./reducers/ProductsSlice";
import likesReducer from "./reducers/LikesSlice";
import cartReducer from "./reducers/CartSlice";
import { productAPI } from "./services/ProductService";

const RootReducer = combineReducers({
  userReducer,
  productsReducer,
  likesReducer,
  cartReducer,
  // [productsApi.reducerPath]: productsApi.reducer,
  [productAPI.reducerPath]: productAPI.reducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: RootReducer,
    middleware: (gDM) => gDM().concat(productAPI.middleware),
  });
};
export type RootState = ReturnType<typeof RootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
