import IProduct from "../../models/IProduct";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ProductsState {
  products: IProduct[];
  isLoading: boolean;
  error: string;
}

const initialState: ProductsState = {
  products: [],
  isLoading: false,
  error: "",
};

export const ProductsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    usersFetching(state) {
      state.isLoading = true;
    },
    usersFetchingSuccess(state, action: PayloadAction<IProduct[]>) {
      state.isLoading = false;
      state.error = "";
      state.products = action.payload;
    },
    usersFetchingError(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default ProductsSlice.reducer;
export const { usersFetching, usersFetchingSuccess, usersFetchingError } =
  ProductsSlice.actions;
