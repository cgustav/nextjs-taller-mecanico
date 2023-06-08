import {
  configureStore,
  ThunkAction,
  Action,
  combineReducers,
  Store,
} from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
// import counterReducer from "./features/counter/counterSlice";
import vehiclesReducer, {
  moduleName as vehiclesRef,
} from "./features/vehicles/vehicleSlice";
import ordersReducer, {
  moduleName as ordersRef,
} from "./features/orders/orderSlice";

import personnelReducer, {
  moduleName as personnelRef,
} from "./features/personnel/personnelSlice";

// import storage from "redux-persist/lib/storage";
// import createWebStorage from "redux-persist/lib/storage/createWebStorage";

import { createWrapper, Context, HYDRATE } from "next-redux-wrapper";

/**
 * Applying NoopStorage Patch to solve
 * redux-persist failed to create sync storage. falling back to noop storage Exception
 */
import createWebStorage from "redux-persist/lib/storage/createWebStorage";

const createNoopStorage = () => {
  return {
    getItem(_key: any) {
      return Promise.resolve(null);
    },
    setItem(_key: any, value: any) {
      return Promise.resolve(value);
    },
    removeItem(_key: any) {
      return Promise.resolve();
    },
  };
};

const storage =
  typeof window !== "undefined"
    ? createWebStorage("local")
    : createNoopStorage();

export enum MODULE_STATUS {
  IDLE = "idle",
  LOADING = "loading",
  FAILED = "failed",
}

const rootReducer = combineReducers({
  vehicles: vehiclesReducer,
  orders: ordersReducer,
  personnel: personnelReducer,
});

const makeConfiguredStore = () =>
  configureStore({
    reducer: rootReducer,
    devTools: true,
  });

export const makeStore = () => {
  const isServer = typeof window === "undefined";

  // return configureStore({
  //   reducer: { counter: counterReducer, vehicles: vehiclesReducer },
  //   devTools: true,
  // });

  if (isServer) {
    return makeConfiguredStore();
    //
  } else {
    // we need it only on client side
    const persistConfig = {
      key: "nextjs",
      whitelist: ["auth", vehiclesRef, ordersRef, personnelRef], // make sure it does not clash with server keys
      storage,
    };

    const persistedReducer = persistReducer(persistConfig, rootReducer);
    let store: any = configureStore({
      reducer: persistedReducer,
      // devTools: process.env.NODE_ENV !== "production",
      devTools: true,
    });
    store.__persistor = persistStore(store); // Nasty hack
    return store;
  }
};

// export const wrapper = createWrapper<AppStore>(makeStore);

const store = makeStore();

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>;

// export an assembled wrapper
export const wrapper = createWrapper(makeStore);

export default store;
