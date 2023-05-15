import { configureStore } from '@reduxjs/toolkit'
import { rootReducer, RootState } from './reducer'
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook,
} from 'react-redux'
import {
  connect as LiveTableWsConnect,
  disconnect as LiveTableWsDisconnect,
  wsOpen as LiveTableWsOpen,
  wsClose as LiveTableWsClose,
  wsMessage as LiveTableWsMessage,
  wsError as LiveTableWsError,
  wsConnecting as LiveTableWsConnecting,
} from './live-table/actions'
import { socetMiddleware } from './live-table/middleware/socket-middleware'

const LiveTableMiddlewarw = socetMiddleware({
  wsConnect: LiveTableWsConnect,
  wsDisconnect: LiveTableWsDisconnect,
  wsConnecting: LiveTableWsConnecting,
  onOpen: LiveTableWsOpen,
  onClose: LiveTableWsClose,
  onError: LiveTableWsError,
  onMessage: LiveTableWsMessage,
})


export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(LiveTableMiddlewarw)
  },
})

export type AppDispatch = typeof store.dispatch
export const useDispatch = () => dispatchHook<AppDispatch>()
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook

export type ThunkAPI = {
  dispatch: AppDispatch
  rejectValue: string
}


