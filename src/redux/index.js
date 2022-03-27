import { configureStore } from "@reduxjs/toolkit";
import { createLogger } from "redux-logger";

export const store = configureStore({
  reducer: {},
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(createLogger()),
});
