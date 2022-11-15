import IProduct from "../../models/IProduct";
import { createSlice } from "@reduxjs/toolkit";

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
  reducers: {},
});

export default ProductsSlice.reducer;
