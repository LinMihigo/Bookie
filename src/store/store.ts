import { combineReducers, configureStore } from "@reduxjs/toolkit";
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
import { State } from "./slices/bookieSlice";

export interface RootState {
  bookie: State;
}

const loadState = () => {
  try {
    const serializedState = sessionStorage.getItem("state");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.log(err);
  }
};

const saveState = (state: RootState) => {
  try {
    const serializedState = JSON.stringify(state);
    sessionStorage.setItem("state", serializedState);
  } catch (err) {
    console.log(err);
  }
};

const persistedState: Partial<RootState> = loadState();
const rootReducer = combineReducers({
  bookie: bookieReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  preloadedState: persistedState,
});

store.subscribe(() => {
  saveState(store.getState());
});

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
