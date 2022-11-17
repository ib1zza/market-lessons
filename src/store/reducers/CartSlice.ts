import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartState {
  products: string[];
}

const initialState: CartState = {
  products: ["1", "2", "3"],
};

export const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<string>) => {
      state.products.push(action.payload);
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.products = state.products.filter((el) => el !== action.payload);
    },
  },
});

export default CartSlice.reducer;
export const { addToCart, removeFromCart } = CartSlice.actions;
