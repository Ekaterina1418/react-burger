import userSlice, {
  initialState,
  getUser,
  registerUser,
  login,
  logout,
  userUpdate,
} from './userSlice'

describe('User slice testing', () => {
  it('should return the initial state', () => {
    expect(userSlice(undefined, { type: '' })).toEqual(initialState)
  })

  it('should handle pending  get user', () => {
    const state = {
      ...initialState,
    }
    const action = { type: getUser.pending.type }
    const result = userSlice(state, action)
    expect(result).toEqual({
      ...initialState,
      loading: true,
      error: undefined,
    })
  })
  it('should handle fulfilled get user', () => {
    const state = {
      ...initialState,
    }
    const user = {
      name: 'Kate',
      email: 'Kate@mail.ru',
    }
    const action = {
      type: getUser.fulfilled.type,
      payload: user,
    }
    const result = userSlice(state, action)
    expect(result).toEqual({
      ...initialState,
      loading: false,
      isAuthChecked: true,
      user: user,
    })
  })

  it('should handle rejected get user', () => {
    const state = {
      ...initialState,
    }
    const action = {
      type: getUser.rejected.type,
      payload: "Can't fetch",
    }
    const result = userSlice(state, action)
    expect(result).toEqual({
      ...initialState,
      loading: false,
      error: "Can't fetch",
    })
  })
  it('should handle pending  registration user', () => {
    const state = {
      ...initialState,
    }
    const action = { type: registerUser.pending.type }
    const result = userSlice(state, action)
    expect(result).toEqual({
      ...initialState,
      loading: true,
    })
  })
  it('should handle fulfilled registration user', () => {
    const state = {
      ...initialState,
    }
    const user = {
      name: 'Kate',
      email: 'Kate@mail.ru',
    }
    const action = { type: registerUser.fulfilled.type, payload: user }
    const result = userSlice(state, action)

    expect(result).toEqual({
      ...initialState,
      loading: false,
      isAuthChecked: true,
      user: user,
    })
  })
  it('should handle rejected registration user', () => {
    const state = {
      ...initialState,
    }
    const action = {
      type: registerUser.rejected.type,
      payload: "Can't fetch",
    }
    const result = userSlice(state, action)
    expect(result).toEqual({
      ...initialState,
      loading: false,
      error: "Can't fetch",
    })
  })
  it('should handle pending  login user', () => {
    const state = {
      ...initialState,
    }
    const action = { type: login.pending.type }
    const result = userSlice(state, action)
    expect(result).toEqual({
      ...initialState,
      loading: true,
    })
  })
  it('should handle fulfilled login user', () => {
    const state = {
      ...initialState,
    }
    const user = {
      name: 'Kate',
      email: 'Kate@mail.ru',
    }
    const action = { type: login.fulfilled.type, payload: user }
    const result = userSlice(state, action)

    expect(result).toEqual({
      ...initialState,
      loading: false,
      isAuthChecked: true,
      user: user,
    })
  })
  it('should handle rejected login user', () => {
    const state = {
      ...initialState,
    }
    const action = {
      type: login.rejected.type,
      payload: "Can't fetch",
    }
    const result = userSlice(state, action)
    expect(result).toEqual({
      ...initialState,
      loading: false,
      error: "Can't fetch",
    })
  })
  it('should handle pending logout user', () => {
    const state = {
      ...initialState,
    }
    const action = { type: logout.pending.type }
    const result = userSlice(state, action)
    expect(result).toEqual({
      ...initialState,
      loading: true,
    })
  })
  it('should handle fulfilled logout user', () => {
    const state = {
      ...initialState,
    }
    const action = { type: logout.fulfilled.type }
    const result = userSlice(state, action)

    expect(result).toEqual({
      ...initialState,
      loading: false,
      isAuthChecked: true,
      user: null,
    })
  })
  it('should handle rejected login user', () => {
    const state = {
      ...initialState,
    }
    const action = {
      type: logout.rejected.type,
      payload: "Can't fetch",
    }
    const result = userSlice(state, action)
    expect(result).toEqual({
      ...initialState,
      loading: false,
      error: "Can't fetch",
    })
  })
  it('should handle pending  user update', () => {
    const state = {
      ...initialState,
    }
    const action = { type: userUpdate.pending.type }
    const result = userSlice(state, action)
    expect(result).toEqual({
      ...initialState,
      loading: true,
    })
  })
  it('should handle fulfilled user update', () => {
    const state = {
      ...initialState,
    }
    const action = {
      type: userUpdate.fulfilled.type,
    }
    const result = userSlice(state, action)
    expect(result).toEqual({
      ...initialState,
      loading: false,
      isAuthChecked: true,
    })
  })
  it('should handle rejected user update', () => {
    const state = {
      ...initialState,
    }
    const action = {
      type: userUpdate.rejected.type,
      payload: "Can't fetch",
    }
    const result = userSlice(state, action)
    expect(result).toEqual({
      ...initialState,
      loading: false,
      error: "Can't fetch",
    })
  })
})
