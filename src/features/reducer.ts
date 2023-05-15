import apiSlice from './api/apiSlice'
import cartSlice from './cart/cartSlice'
import orderSlice from './order/orderSlice'
import userSlice from './auth/userSlice'
import {combineReducers} from "@reduxjs/toolkit";
import {OrderTableReducer} from './live-table/reducer';
import detailsOrderSlice from './details-order/detailsOrderSlice';

export const rootReducer = combineReducers({
    ingredients: apiSlice,
    cart: cartSlice,
    orderes: orderSlice,
    user: userSlice,
    order: detailsOrderSlice,
    liveTable: OrderTableReducer
});

export type RootState = ReturnType<typeof rootReducer>;