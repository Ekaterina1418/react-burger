import {createReducer} from '@reduxjs/toolkit'
import {WebsocketStatus, TOrdersResponse} from '../../utils/types'
import {
    wsProfileFeedClose,
    wsProfileFeedConnecting,
    wsProfileFeedError,
    wsProfileFeedMessage,
    wsProfileFeedOpen
} from './actions'

export type FeedStore = {
    status: WebsocketStatus
    orders: TOrdersResponse | null
    connectingError: string
}

const initialState: FeedStore = {
    status: WebsocketStatus.OFFLINE,
    orders: null,
    connectingError: ''
}

export const profileFeedReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(wsProfileFeedConnecting, (state) => {
            state.status = WebsocketStatus.CONNECTING
        })
        .addCase(wsProfileFeedOpen, (state) => {
            state.status = WebsocketStatus.ONLINE
            state.connectingError = ''
        })
        .addCase(wsProfileFeedClose, (state) => {
            state.status = WebsocketStatus.OFFLINE
        })
        .addCase(wsProfileFeedError, (state, action) => {
            state.connectingError = action.payload
        })
        .addCase(wsProfileFeedMessage, (state, action) => {
            state.orders = action.payload
        })
})
