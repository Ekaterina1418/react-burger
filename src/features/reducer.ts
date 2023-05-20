import apiSlice from './api/apiSlice'
import cartSlice from './cart/cartSlice'
import orderSlice from './order/orderSlice'
import userSlice from './auth/userSlice'
import { combineReducers } from '@reduxjs/toolkit'
import { profileFeedReducer } from './profile-feed/reducer'
import { feedReducer } from './feed/reducer'
import detailsOrderSlice from './details-order/detailsOrderSlice'

export const rootReducer = combineReducers({
  ingredients: apiSlice,
  cart: cartSlice,
  orderes: orderSlice,
  user: userSlice,
  order: detailsOrderSlice,
  feed: feedReducer,
  profileFeed: profileFeedReducer,
})

export type RootState = ReturnType<typeof rootReducer>
