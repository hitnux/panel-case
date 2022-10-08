import { createSlice } from '@reduxjs/toolkit'
import { getUser } from '../../utils/login';
import { findUser } from '../../utils/login';

const accessKey = localStorage.getItem('accces_key');

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        current: accessKey ? getUser() : {},
        isLogin: accessKey ? true : false
    },
    reducers: {
        login: (state, action) => {
            const user = findUser({ username: action.payload.username, password: action.payload.password });

            if (user && user.accessKey) {
                localStorage.setItem('accces_key', user.accessKey);
                state.current = user;
                state.isLogin = true;
            }
        },
        logOut: (state) => {
            localStorage.removeItem('accces_key');
            state.current = {};
            state.isLogin = false;
        }
    }
})

export const { login, logOut } = userSlice.actions
export default userSlice.reducer