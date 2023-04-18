import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

import counterReducer from "./features/counter/counterSlice";
import vehiclesReducer from "./features/vehicles/vehicleSlice";

export enum MODULE_STATUS {
  IDLE = "idle",
  LOADING = "loading",
  FAILED = "failed",
}

export function makeStore() {
  return configureStore({
    reducer: { counter: counterReducer, vehicles: vehiclesReducer },
  });
}

const store = makeStore();

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>;

export default store;
