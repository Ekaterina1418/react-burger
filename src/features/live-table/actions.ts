import { createAction } from '@reduxjs/toolkit' 
import { LiveTableActions } from '../../utils/types'
 
export const connect = createAction<string,'ORDER_TABLE_CONNECT'>('ORDER_TABLE_CONNECT')

export const disconnect = createAction('ORDER_TABLE_DISCONNECT')

export const wsConnecting =createAction('ORDER_TABLE_WS_CONNECTING')

export const wsOpen = createAction('ORDER_TABLE_WS_OPEN')

export const wsClose = createAction('ORDER_TABLE_WS_CLOSE')

export const wsMessage = createAction<LiveTableActions, 'ORDER_TABLE_WS_MESSAGE'>('ORDER_TABLE_WS_MESSAGE')

export const wsError =  createAction<string, 'ORDER_TABLE_WS_ERROR'>('ORDER_TABLE_WS_ERROR')


export type TLiveTableActions = ReturnType<typeof connect>
| ReturnType<typeof disconnect>
| ReturnType<typeof wsConnecting>
| ReturnType<typeof wsOpen>
| ReturnType<typeof wsClose> 
| ReturnType<typeof wsMessage>
| ReturnType<typeof wsError>