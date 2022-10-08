import { createSlice } from '@reduxjs/toolkit'
import { getUser } from '../../utils/login'
import OrderData from '../../data/orders.json'

const Orders = OrderData.orders;
const initialState = {
    list: getUser() ? Orders : {},
    filters: [],
    currentOrder: {}
};

Orders.forEach(val => {
    if (!initialState.filters.includes(val.state)) initialState.filters.push(val.state);
});

export const orderSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        allOrders: (state) => {
            state.list = Orders;
        },
        setFilters: (state, action) => {
            state.list = Orders.filter(order => (action.payload.find(v => v === order.state)))
        },
        findOrder: (state, action) => {
            state.currentOrder = Orders.find(o => o.id === parseInt(action.payload))
        }
    }
})


export const { allOrders, setFilters, findOrder } = orderSlice.actions
export default orderSlice.reducer