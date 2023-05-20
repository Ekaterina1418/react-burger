import { createReducer } from '@reduxjs/toolkit'
import {WebsocketStatus, TOrdersResponse} from '../../utils/types'
import { wsFeedClose, wsFeedConnecting, wsFeedError, wsFeedMessage, wsFeedOpen } from './actions'

export type LiveTableStore = {
  status: WebsocketStatus
  orders: TOrdersResponse | null
  connectingError: string
}

const initialState: LiveTableStore = {
  status: WebsocketStatus.OFFLINE,
  orders: null,
  connectingError: '',
}

export const feedReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(wsFeedConnecting, (state) => {
      state.status = WebsocketStatus.CONNECTING
    })
    .addCase(wsFeedOpen, (state) => {
      state.status = WebsocketStatus.ONLINE
      state.connectingError = ''
    })
    .addCase(wsFeedClose, (state) => {
      state.status = WebsocketStatus.OFFLINE
    })
    .addCase(wsFeedError, (state, action) => {
      state.connectingError = action.payload
    })
    .addCase(wsFeedMessage, (state, action) => {
      state.orders = action.payload
    })
})
