import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import errorReducer from "../features/errors/errorSlice";
import adReducer from "../features/ad/adSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    errors: errorReducer,
    ad: adReducer,
  },
});
