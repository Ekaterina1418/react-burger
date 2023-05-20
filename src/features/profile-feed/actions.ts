import { createAction } from '@reduxjs/toolkit' 
import { TOrdersResponse } from '../../utils/types'
 
export const connectProfileFeed = createAction<string,'PROFILE_ORDER_CONNECT'>('PROFILE_ORDER_CONNECT')

export const disconnectProfileFeed = createAction('PROFILE_ORDER_DISCONNECT')

export const wsProfileFeedConnecting =createAction('PROFILE_ORDER_CONNECTING')

export const wsProfileFeedOpen = createAction('PROFILE_ORDER_WS_OPEN')

export const wsProfileFeedClose = createAction('PROFILE_ORDER_WS_CLOSE')

export const wsProfileFeedMessage = createAction<TOrdersResponse, 'PROFILE_ORDER_WS_MESSAGE'>('PROFILE_ORDER_WS_MESSAGE')

export const wsProfileFeedError =  createAction<string, 'PROFILE_ORDER_WS_ERROR'>('PROFILE_ORDER_WS_ERROR')


export type TProfileFeedActions = ReturnType<typeof connectProfileFeed>
| ReturnType<typeof disconnectProfileFeed>
| ReturnType<typeof wsProfileFeedConnecting>
| ReturnType<typeof wsProfileFeedOpen>
| ReturnType<typeof wsProfileFeedClose>
| ReturnType<typeof wsProfileFeedMessage>
| ReturnType<typeof wsProfileFeedError>