import { createReducer } from '@reduxjs/toolkit'
import { WebsocketStatus, LiveTable } from '../../utils/types'
import { wsClose, wsConnecting, wsError, wsMessage, wsOpen } from './actions'

export type LiveTableStore = {
  status: WebsocketStatus
  orders: LiveTable 
  connectingError: string
}

const initialState: LiveTableStore = {
  status: WebsocketStatus.OFFLINE,
  orders: [],
  connectingError: '',
}

export const OrderTableReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(wsConnecting, (state) => {
      state.status = WebsocketStatus.CONNECTING
    })
    .addCase(wsOpen, (state) => {
      state.status = WebsocketStatus.ONLINE
      state.connectingError = ''
    })
    .addCase(wsClose, (state) => {
      state.status = WebsocketStatus.OFFLINE
    })
    .addCase(wsError, (state, action) => {
      state.connectingError = action.payload
    })
    .addCase(wsMessage, (state, action) => {
      state.orders = action.payload
    })
})
