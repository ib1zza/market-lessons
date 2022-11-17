import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/UserSlice";
import productsReducer from "./reducers/ProductsSlice";
import likesReducer from "./reducers/LikesSlice";

const RootReducer = combineReducers({
  userReducer,
  productsReducer,
  likesReducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: RootReducer,
  });
};
export type RootState = ReturnType<typeof RootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
