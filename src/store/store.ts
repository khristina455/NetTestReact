import filterReducer from './filterModelingsSlice';
import { configureStore } from "@reduxjs/toolkit"
import { persistReducer, persistStore } from 'redux-persist';
import authReducer from "./authSlice"
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux'
import filterRequetsSlice from './filterRequetsSlice';

const persistConfig = {
    key: 'root',
    storage,
}

const rootReducer = combineReducers({
    filter: filterReducer,
    user: authReducer,
    filterRequest: filterRequetsSlice
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer
})

export const persistor = persistStore(store)
