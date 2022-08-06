import { configureStore } from '@reduxjs/toolkit'
import userReducer from './reducer/user'
import orderReducer from './reducer/orders'

export default configureStore({
    reducer: {
        user: userReducer,
        orders: orderReducer
    },
})