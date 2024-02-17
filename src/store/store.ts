import { configureStore } from "@reduxjs/toolkit";
import { bookieReducer } from "./slices/bookieSlice";
import {
  setSearchTerm,
  setIsLoaded,
  setPageIndex,
  setSelectedValue,
  setIsLoading,
  setData,
} from "./slices/bookieSlice";

export const store = configureStore({
  reducer: {
    bookie: bookieReducer,
  },
});

console.log(store.getState());

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export {
  setSearchTerm,
  setPageIndex,
  setIsLoaded,
  setSelectedValue,
  setIsLoading,
  setData,
};
