import { combineReducers } from '@reduxjs/toolkit'
import authReducer from './reducers/auth'
import cartReducer from './reducers/cart'

export const rootReducer = combineReducers({
    auth: authReducer,
    cart: cartReducer
    //example: exampleReducer
})