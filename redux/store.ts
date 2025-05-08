import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import groupReducer from "./groupSlice";
import taskReducer from "./taskSlice";
export const store = configureStore({
  reducer: { auth: userReducer, group: groupReducer, task: taskReducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
