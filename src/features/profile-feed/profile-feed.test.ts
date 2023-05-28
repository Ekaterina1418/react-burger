import { profileFeedReducer, initialState } from './reducer'
import {
  wsProfileFeedConnecting,
  wsProfileFeedClose,
  wsProfileFeedError,
  wsProfileFeedMessage,
  wsProfileFeedOpen,
} from './actions'
import { WebsocketStatus } from '../../utils/types'

describe('Websocket slice testing', () => {
  it('should return the initial state', () => {
    expect(profileFeedReducer(undefined, { type: '' })).toEqual(initialState)
  })
  it('Connection test', () => {
    const state = {
      ...initialState,
    }
    const action = { type: wsProfileFeedConnecting }
    const result = profileFeedReducer(state, action)
    expect(result).toEqual({
      ...initialState,
      status: WebsocketStatus.CONNECTING,
    })
  })
  it('Websocket online', () => {
    const state = {
      ...initialState,
    }
    const action = { type: wsProfileFeedOpen }
    const result = profileFeedReducer(state, action)
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
    const action = { type: wsProfileFeedClose }
    const result = profileFeedReducer(state, action)
    expect(result).toEqual({
      ...initialState,
      status: WebsocketStatus.OFFLINE,
    })
  })
  it('Websocket error', () => {
    const state = {
      ...initialState,
    }
    const action = { type: wsProfileFeedError, payload: 'Connection error' }
    const result = profileFeedReducer(state, action)
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
    const action = { type: wsProfileFeedMessage, payload: orders }
    const result = profileFeedReducer(state, action)
    expect(result).toEqual({
      ...initialState,
      orders: orders,
    })
  })
})
