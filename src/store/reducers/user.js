import { createSlice } from '@reduxjs/toolkit'
import { getUser, findUser, secure } from '../../utils/login';
import UserData from '../../data/users.json';

const Users = UserData.users;
const accessKey = localStorage.getItem('accces_key');
const roles = [];

Users.forEach((u) => {
    if (!roles.find((r) => (r === u.role))) roles.push(u.role);
});

const initialState = {
    users: [],
    roles,
    current: accessKey ? getUser() : {},
    isLogin: accessKey ? true : false
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        getAllUsers: (state) => {
            state.users = secure(Users);
        },
        filterUser: (state, action) => {
            state.users = secure(
                Users.filter((user) => (action.payload.find((r) => (r === user.role))))
            );
        },
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

export const { login, logOut, filterUser, getAllUsers } = userSlice.actions
export default userSlice.reducer