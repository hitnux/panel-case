import { configureStore } from '@reduxjs/toolkit'
import userReducer from './reducers/user'
import orderReducer from './reducers/orders'

export default configureStore({
    reducer: {
        user: userReducer,
        orders: orderReducer
    },
})