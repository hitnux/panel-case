import { createSlice } from '@reduxjs/toolkit'
import { getUser } from '../utils/login'
import OrderData from '../data/orders.json'

export const orderSlice = createSlice({
    name: 'orders',
    initialState: {
        value: getUser() ? OrderData.orders : {}
    },
    reducers: {
        setOrders: (state, action) => {
            state.value = action.payload;
        }
    }
})

export const { setOrders } = orderSlice.actions
export default orderSlice.reducer