import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // localStorage for web
import personalInfoReducer from "../personalInfoSlice";
import authReducer from "@/redux/auth/authSlice";
import employeeReducer from "@/redux/employeeSlice";

// Persist config for the auth slice only
const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["token", "user"], // adjust fields you want to persist
};

// Wrap auth reducer with persistReducer
const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,        // persisted auth slice
    personalInfo: personalInfoReducer, // non-persisted
    employees: employeeReducer,        // non-persisted
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // suppress redux-persist warnings
    }),
});

export const persistor = persistStore(store);