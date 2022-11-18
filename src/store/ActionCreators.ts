import { AppDispatch } from "./store";
import axios, { AxiosError } from "axios";
import IProduct from "../models/IProduct";
import {
  usersFetchingError,
  usersFetchingSuccess,
} from "./reducers/ProductsSlice";
import { usersFetching } from "./reducers/ProductsSlice";

export const fetchAllPosts = async (dispatch: AppDispatch) => {
  try {
    dispatch(usersFetching());
    const response = await axios.get<IProduct[]>(
      "https://fakestoreapi.com/products"
    );
    dispatch(usersFetchingSuccess(response.data));
  } catch (e) {
    const error = e as AxiosError;
    dispatch(usersFetchingError(error.message));
  }
};
