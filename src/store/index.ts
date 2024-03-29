import { configureStore, Middleware } from "@reduxjs/toolkit";

import notesReducer from "./notes.slice";
import loadingReducer from "./loading.slice";

const persistanceLocalStorageMiddleware: Middleware =
  (store) => (next) => (action) => {
    next(action);
    localStorage.setItem("notes", JSON.stringify(store.getState()));
  };

export const store = configureStore({
  reducer: {
    notes: notesReducer,
    loading: loadingReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(persistanceLocalStorageMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
