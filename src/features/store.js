import { configureStore } from '@reduxjs/toolkit'
import apiSlice from './api/apiSlice'
import cartSlice from './cart/cartSlice'
import orderSlice from './order/orderSlice'
import userSlice from './auth/userSlice'
export const store = configureStore({
  reducer: {
    ingredients: apiSlice,
    cart: cartSlice,
    orderes: orderSlice,
    user: userSlice,
  },
  devTools: process.env.NODE_ENV !== 'production',
})
