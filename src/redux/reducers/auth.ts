import { createSlice } from '@reduxjs/toolkit';
import { IAuth } from '../../@types/auth';


const initialState = { 
    login: {email: 'email',password: 'senha'},
    account_details: undefined

} as IAuth

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        ResetState: state => initialState
    }
})

export const { ResetState } = authSlice.actions

export default authSlice.reducer