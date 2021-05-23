import { createSlice } from '@reduxjs/toolkit';
import { IProduct } from '../../@types/product';
import { getProduct } from '../actions/cart';

interface ICart {
    product: IProduct|undefined
}

const initialState = { 
    product: undefined
} as ICart

const cardSlice = createSlice({
    name: 'card',
    initialState,
    reducers: {
        ResetState: state => initialState
    },
    extraReducers: builder => {
        builder.addCase(getProduct.fulfilled, (state, action) => {state.product = action.payload})
    }
})

export const { ResetState } = cardSlice.actions

export default cardSlice.reducer