import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Uses localStorage

import generalStateReducer from "../Slice/GeneralStateSlice";

// Persist configuration
const persistConfig = {
    key: "root",
    storage,
};

// Combine reducers (for multiple reducers)
const rootReducer = combineReducers({
    generalState: generalStateReducer,
});

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store
export const store = configureStore({
    reducer: persistedReducer,
});

// Create persistor object
export const persistor = persistStore(store);