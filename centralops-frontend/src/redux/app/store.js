import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

// Import slices using correct paths
import authReducer from "@/redux/auth/authSlice";
import personalInfoReducer from "@/redux/personalInfoSlice";
import departmentReducer from "@/redux/departmentSlice";
import positionReducer from "@/redux/positionSlice";
import roleReducer from "@/redux/roleSlice";
import sectionReducer from "@/redux/sectionSlice";

// Persist config for auth only
const persistConfig = {
  key: "root",
  storage,
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,       // persisted auth
    personalInfo: personalInfoReducer, // non-persisted personal info
    department: departmentReducer,
    position: positionReducer,
    role: roleReducer,
    section: sectionReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // needed for redux-persist
    }),
});

export const persistor = persistStore(store);
