import { configureStore } from "@reduxjs/toolkit";
import { bookieReducer } from "./slices/bookieSlice";
import {
  setSearchTerm,
  setIsLoaded,
  setLimit,
  setPageIndex,
  setSelectedValue,
  setIsLoading,
  setData,
  setSort,
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
  setLimit,
  setPageIndex,
  setIsLoaded,
  setSelectedValue,
  setIsLoading,
  setData,
  setSort,
};
