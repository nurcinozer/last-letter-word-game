import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { gameReducer } from "./slices";

const rootReducer = combineReducers({
  game: gameReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
