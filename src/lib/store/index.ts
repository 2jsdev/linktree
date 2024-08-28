"use client";

import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers";
import { appApi } from "@/@core/infra/api/app";
import rtkQueryErrorLogger from "./middleware/rtkQueryErrorLogger";
import { setupListeners } from "@reduxjs/toolkit/query";

const reducerList = {
  ...rootReducer,
  [appApi.reducerPath]: appApi.reducer,
};

export const createStore = (preloadedState = {}) => {
  return configureStore({
    reducer: reducerList,
    devTools: process.env.NODE_ENV !== "production",
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .concat(appApi.middleware)
        .concat(rtkQueryErrorLogger),
    preloadedState,
  });
};

const store = createStore();

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
