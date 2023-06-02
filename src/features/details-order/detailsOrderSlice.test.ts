import detailsOrderSlice, { initialState, getOrder } from './detailsOrderSlice'

describe('Details order slice testing', () => {
  it('should return the initial state', () => {
    expect(detailsOrderSlice(undefined, { type: '' })).toEqual(initialState)
  })
  it('should handle pending get order', () => {
    const state = {
      ...initialState,
    }
    const action = { type: getOrder.pending.type }
    const result = detailsOrderSlice(state, action)
    expect(result).toEqual({
      ...initialState,
      loading: true,
    })
  })
  it('should handle fulfilled get order', () => {
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
    const action = { type: getOrder.fulfilled.type, payload: [orders] }
    const result = detailsOrderSlice(state, action)
    expect(result).toEqual({
      ...initialState,
      loading: false,
      orders: [orders],
      error: '',
    })
  })
  it('should handle rejected get order', () => {
    const state = {
      ...initialState,
    }
    const action = {
      type: getOrder.rejected.type,
      payload: "Can't fetch",
    }
    const result = detailsOrderSlice(state, action)
    expect(result).toEqual({
      ...initialState,
      loading: false,
      orders: [],
      error: "Can't fetch",
    })
  })
})
