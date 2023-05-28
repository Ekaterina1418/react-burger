import { feedReducer, initialState } from './reducer'
import {
  wsFeedClose,
  wsFeedConnecting,
  wsFeedError,
  wsFeedMessage,
  wsFeedOpen,
} from './actions'
import { WebsocketStatus } from '../../utils/types'

describe('Websocket slice testing', () => {
  it('should return the initial state', () => {
    expect(feedReducer(undefined, { type: '' })).toEqual(initialState)
  })
  it('Connection test', () => {
    const state = {
      ...initialState,
    }
    const action = { type: wsFeedConnecting }
    const result = feedReducer(state, action)
    expect(result).toEqual({
      ...initialState,
      status: WebsocketStatus.CONNECTING,
    })
  })
  it('Websocket online', () => {
    const state = {
      ...initialState,
    }
    const action = { type: wsFeedOpen }
    const result = feedReducer(state, action)
    expect(result).toEqual({
      ...initialState,
      status: WebsocketStatus.ONLINE,
      connectingError: '',
    })
  })
  it('Websocket close', () => {
    const state = {
      ...initialState,
    }
    const action = { type: wsFeedClose }
    const result = feedReducer(state, action)
    expect(result).toEqual({
      ...initialState,
      status: WebsocketStatus.OFFLINE,
    })
  })
  it('Websocket error', () => {
    const state = {
      ...initialState,
    }
    const action = { type: wsFeedError, payload: 'Connection error' }
    const result = feedReducer(state, action)
    expect(result).toEqual({
      ...initialState,
      connectingError: 'Connection error',
    })
  })
  it('Websocket message', () => {
    const state = {
      ...initialState,
    }
    const orders = {
      orders: {
        ingredients: ['2f566778a', '3d5612f4g', '3a453467b'],
        _id: '3a564567d',
        status: 'done',
        name: 'Space burger',
        number: 34768,
        createdAt: '12-05-2023',
        updatedAt: '13-05-2023',
      },
      total: 5687,
      totalToday: 123,
    }
    const action = { type: wsFeedMessage, payload: orders }
    const result = feedReducer(state, action)
    expect(result).toEqual({
      ...initialState,
      orders: orders,
    })
  })
})
