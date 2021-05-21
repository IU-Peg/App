import { combineReducers } from '@reduxjs/toolkit'
import authReducer from './reducers/auth'

export const rootReducer = combineReducers({
    auth: authReducer,
    //example: exampleReducer
})