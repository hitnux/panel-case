import { createSlice } from '@reduxjs/toolkit'
import { getUser } from '../utils/login';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        current: localStorage.getItem('accces_key') ? getUser() : {}
    },
    reducers: {
        login: (state, action) => {
            state.current = action.payload;
        },
        logOut: (state) => {
            localStorage.removeItem('accces_key');
            state.current = {};
        }
    }
})

export const { login, logOut } = userSlice.actions
export default userSlice.reducer