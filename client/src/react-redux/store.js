import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "./reducers/userSlice";

// Configuration for redux-persist
const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

// Root reducer combining all reducers
const rootReducer = combineReducers({
  user: userReducer, // Add more reducers as needed
});

// Create persisted reducer with redux-persist
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the Redux store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // Ignore specific redux-persist actions for serializability check
      serializableCheck: {
        ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Create a persistor object to persist the store
export const persistor = persistStore(store);
