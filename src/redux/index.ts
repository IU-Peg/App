import {
    configureStore
} from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { rootReducer } from './rootReducer';
import { getDefaultMiddleware } from '@reduxjs/toolkit';

export type RootState = ReturnType<typeof rootReducer>

const middleware = getDefaultMiddleware({
    serializableCheck: false,
    immutableCheck: false // TRUE -> SLOW PERFORMANCE
 })

export const Store = configureStore({
    reducer: rootReducer,
    middleware
})

export type AppDispatch = typeof Store.dispatch
export const useReduxDispatch = (): AppDispatch => useDispatch<AppDispatch>()
export const useReduxSelector: TypedUseSelectorHook<RootState> = useSelector