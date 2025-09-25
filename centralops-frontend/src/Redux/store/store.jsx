import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../../Redux/app/authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
