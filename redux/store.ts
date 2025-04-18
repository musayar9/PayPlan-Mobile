import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
export const store = configureStore({
  reducer: { auth: userReducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});
