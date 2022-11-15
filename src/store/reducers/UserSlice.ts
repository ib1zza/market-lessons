import IProduct from "../../models/IProduct";
import { createSlice } from "@reduxjs/toolkit";
import IUser from "../../models/IUser";

interface UserState {
  users: IUser[];
  isLoading: boolean;
  error: string;
}

const initialState: UserState = {
  users: [],
  isLoading: false,
  error: "",
};

export const UserSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
});

export default UserSlice.reducer;
