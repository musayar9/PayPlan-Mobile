import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import groupReducer from "./groupSlice";
export const store = configureStore({
  reducer: { auth: userReducer, group: groupReducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
