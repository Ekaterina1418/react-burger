import {
  ActionCreatorWithPayload,
  ActionCreatorWithoutPayload,
} from '@reduxjs/toolkit'
import { Middleware } from 'redux'
import { RootState } from '../../reducer'

export type TwsActionTypes = {
  wsConnect: ActionCreatorWithPayload<string>
  wsDisconnect: ActionCreatorWithoutPayload
  wsSendMessage?: ActionCreatorWithPayload<any>
  wsConnecting: ActionCreatorWithoutPayload
  onOpen: ActionCreatorWithoutPayload
  onClose: ActionCreatorWithoutPayload
  onError: ActionCreatorWithPayload<string>
  onMessage: ActionCreatorWithPayload<any>
}

export const socetMiddleware = (
  wsActions: TwsActionTypes
): Middleware<{}, RootState> => {
  return (store) => {
    let socket: WebSocket | null = null

    return (next) => (action) => {
      const { dispatch } = store

      const {
        wsConnect,
        wsDisconnect,
        wsSendMessage,
        onOpen,
        onClose,
        onError,
        onMessage,
        wsConnecting,
      } = wsActions

      if (wsConnect.match(action)) {
        socket = new WebSocket(action.payload)
        dispatch(wsConnecting())
      }
      if (socket) {
        socket.onopen = (event) => {
          dispatch(onOpen())
        }
        socket.onerror = (event) => {
          dispatch(onError('Error'))
        }
        socket.onmessage = (event) => {
          const { data } = event
          const parseData = JSON.parse(data)
          dispatch(onMessage(parseData))
        }
        socket.onclose = (event) => {
          dispatch(onClose())
        }
      }
      next(action)
    }
  }
}
