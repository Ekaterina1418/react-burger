import orderSlice, { initialState, createOrder, resetOrder } from './orderSlice'

describe('Testing slice order', () => {
  it('should return the initial state', () => {
    expect(orderSlice(undefined, { type: '' })).toEqual(initialState)
  })

  it('should handle pending get order', () => {
    const state = {
      ...initialState,
    }
    const action = { type: createOrder.pending.type }
    const result = orderSlice(state, action)
    expect(result).toEqual({
      ...initialState,
      loading: true,
    })
  })
  it('should handle fulfilled get order', () => {
    const state = {
      ...initialState,
    }
    const order = {
      name: 'Space burger',
      order: {
        number: 34789,
      },
      success: true,
    }
    const action = { type: createOrder.fulfilled.type, payload: order }
    const result = orderSlice(state, action)
    expect(result).toEqual({
      ...initialState,
      loading: false,
      order: order,
      error: '',
    })
  })
  it('should handle rejected get order', () => {
    const state = {
      ...initialState,
    }
    const action = {
      type: createOrder.rejected.type,
      payload: "Can't fetch",
    }
    const result = orderSlice(state, action)
    expect(result).toEqual({
      ...initialState,
      loading: false,
      order: null,
      error: "Can't fetch",
    })
  })
  it('order cleanup check', () => {
    const state = {
      ...initialState,
    }
    const result = orderSlice(state, resetOrder())
    expect(result).toEqual({
      ...initialState,
      order: null,
    })
  })
})
