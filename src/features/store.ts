import { configureStore } from '@reduxjs/toolkit'
import { rootReducer, RootState } from './reducer'
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook,
} from 'react-redux'
import {
  connectFeed,
  disconnectFeed,
  wsFeedOpen,
  wsFeedClose,
  wsFeedMessage,
  wsFeedError,
  wsFeedConnecting,
} from './feed/actions'
import {
  connectProfileFeed,
  disconnectProfileFeed,
  wsProfileFeedOpen,
  wsProfileFeedClose,
  wsProfileFeedMessage,
  wsProfileFeedError,
  wsProfileFeedConnecting,
} from './profile-feed/actions'
import { socetMiddleware } from './middleware/socket-middleware'

const feedMiddleware = socetMiddleware({
  wsConnect: connectFeed,
  wsDisconnect: disconnectFeed,
  wsConnecting: wsFeedConnecting,
  onOpen: wsFeedOpen,
  onClose: wsFeedClose,
  onError: wsFeedError,
  onMessage: wsFeedMessage,
})

const profileFeedMiddleware = socetMiddleware({
  wsConnect: connectProfileFeed,
  wsDisconnect: disconnectProfileFeed,
  wsConnecting: wsProfileFeedConnecting,
  onOpen: wsProfileFeedOpen,
  onClose: wsProfileFeedClose,
  onError: wsProfileFeedError,
  onMessage: wsProfileFeedMessage,
})

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(feedMiddleware, profileFeedMiddleware)
  },
})

export type AppDispatch = typeof store.dispatch
export const useDispatch = () => dispatchHook<AppDispatch>()
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook

export type ThunkAPI = {
  dispatch: AppDispatch
  rejectValue: string
}

