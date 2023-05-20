import { createAction } from '@reduxjs/toolkit' 
import { TOrdersResponse } from '../../utils/types'
 
export const connectFeed = createAction<string,'ORDER_CONNECT'>('ORDER_CONNECT')

export const disconnectFeed = createAction('ORDER_DISCONNECT')

export const wsFeedConnecting =createAction('ORDER_CONNECTING')

export const wsFeedOpen = createAction('ORDER_WS_OPEN')

export const wsFeedClose = createAction('ORDER_WS_CLOSE')

export const wsFeedMessage = createAction<TOrdersResponse, 'ORDER_WS_MESSAGE'>('ORDER_WS_MESSAGE')

export const wsFeedError =  createAction<string, 'ORDER_WS_ERROR'>('ORDER_WS_ERROR')


export type TFeedActions = ReturnType<typeof connectFeed>
| ReturnType<typeof disconnectFeed>
| ReturnType<typeof wsFeedConnecting>
| ReturnType<typeof wsFeedOpen>
| ReturnType<typeof wsFeedClose>
| ReturnType<typeof wsFeedMessage>
| ReturnType<typeof wsFeedError>