import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { BASE_URL } from '../../utils/data'
export const checkResponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err))
}

export const checkUserAuth = () => {
  return (dispatch) => {
    if (localStorage.getItem('accessToken')) {
      dispatch(getUser())
        .catch(() => {
          localStorage.removeItem('accessToken')
          localStorage.removeItem('refreshToken')
          dispatch(setUser({}))
        })
        .finally(() => dispatch(setAuthChecked(true)))
    } else {
      dispatch(setAuthChecked(true))
    }
  }
}

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (form, { rejectWithValue, dispatch }) => {
    try {
      const data = await fetch(`${BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(form),
      })

      const res = await checkResponse(data)
      localStorage.setItem('accessToken', res.accessToken)
      localStorage.setItem('refreshToken', res.refreshToken)
      dispatch(setUser(res))
      dispatch(setAuthChecked(true))
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const login = createAsyncThunk(
  'auth/login',

  async ({ email, password }, { rejectWithValue, dispatch }) => {
    try {
      const data = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({ email, password }),
      })

      const res = await checkResponse(data)
      localStorage.setItem('accessToken', res.accessToken)
      localStorage.setItem('refreshToken', res.refreshToken)
      dispatch(setUser(res))
      dispatch(setAuthChecked(true))
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const refreshToken = createAsyncThunk(
  'auth/token',
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const data = await fetch(`${BASE_URL}/auth/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({
          token: localStorage.getItem('refreshToken'),
        }),
      })

      await checkResponse(data)
      dispatch(setAuthChecked(true))
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const resetPassword = createAsyncThunk(
  'auth/reset-password',
  async (form, { rejectWithValue, dispatch }) => {
    try {
      const data = await fetch(`${BASE_URL}/password-reset/reset`, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(form),
      })
      await checkResponse(data)

      dispatch(setAuthChecked(true))
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const forgotPassword = createAsyncThunk(
  'auth/forgot-password',
  async (email, { rejectWithValue, dispatch }) => {
    try {
      const data = await fetch(`${BASE_URL}/password-reset`, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify({ email: email }),
      })
      await checkResponse(data)
      dispatch(setAuthChecked(true))
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const fetchWithRefresh = async (url, options) => {
  try {
    const res = await fetch(url, options)
    return await checkResponse(res)
  } catch (err) {
    if (err.message === 'jwt expired') {
      const refreshData = await refreshToken()
      if (!refreshData.success) {
        return Promise.reject(refreshData)
      }
      localStorage.setItem('refreshToken', refreshData.refreshToken)
      localStorage.setItem('accessToken', refreshData.accessToken)
      options.headers.authorization = refreshData.accessToken
      const res = await fetch(url, options)
      return await checkResponse(res)
    } else {
      return Promise.reject(err)
    }
  }
}

export const getUser = createAsyncThunk(
  'auth/user',
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const data = await fetchWithRefresh(`${BASE_URL}/auth/user`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          authorization: localStorage.getItem('accessToken'),
        },
      })
      const { success, ...user } = data
      if (success) {
        dispatch(setUser(user))
        dispatch(setAuthChecked(true))
      }
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)
export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const data = await fetch(`${BASE_URL}/auth/logout `, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({
          token: localStorage.getItem('refreshToken'),
        }),
      })
      await checkResponse(data)

      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
      dispatch(setUser({}))
      dispatch(setAuthChecked(true))
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const userUpdate = createAsyncThunk(
  'auth/update',

  async ({ name, email, password }, { rejectWithValue, dispatch }) => {
    try {
      const data = await fetch(`${BASE_URL}/auth/user`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          authorization: localStorage.getItem('accessToken'),
        },
        body: JSON.stringify({ name, email, password }),
      })

      const res = await checkResponse(data)

      dispatch(setUser(res))
      dispatch(setAuthChecked(true))
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)
// export interface User {
//   name:string
//   email: string
// }
// export interface userState {
//   loading: boolean
//   user: User
//   error: string | null
//   isAuthChecked: boolean
// }
const initialState = {
  loading: false,
  user: null,
  error: null,
  isAuthChecked: false,
}
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuthChecked: (state, action) => {
      state.isAuthChecked = action.payload
    },
    setUser: (state, action) => {
      state.user = action.payload.user
    },
  },
  extraReducers: {
    [getUser.pending]: (state) => {
      state.loading = true
      state.error = null
    },
    [getUser.fulfilled]: (state) => {
      state.loading = false
    },
    [getUser.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
    [registerUser.pending]: (state) => {
      state.loading = true
      state.error = null
    },
    [registerUser.fulfilled]: (state) => {
      state.loading = false
    },
    [registerUser.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
    [login.pending]: (state) => {
      state.loading = true
      state.error = null
    },
    [login.fulfilled]: (state) => {
      state.loading = false
    },
    [login.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
  },
  [refreshToken.pending]: (state) => {
    state.loading = true
    state.error = null
  },
  [refreshToken.fulfilled]: (state) => {
    state.loading = false
  },
  [refreshToken.rejected]: (state, action) => {
    state.loading = false
    state.error = action.payload
  },
  [resetPassword.pending]: (state) => {
    state.loading = true
    state.error = null
  },
  [resetPassword.fulfilled]: (state) => {
    state.loading = false
  },
  [resetPassword.rejected]: (state, action) => {
    state.loading = false
    state.error = action.payload
  },
  [forgotPassword.pending]: (state) => {
    state.loading = true
    state.error = null
  },
  [forgotPassword.fulfilled]: (state) => {
    state.loading = false
  },
  [forgotPassword.rejected]: (state, action) => {
    state.loading = false
    state.error = action.payload
  },
  [userUpdate.pending]: (state) => {
    state.loading = true
    state.error = null
  },
  [userUpdate.fulfilled]: (state) => {
    state.loading = false
  },
  [userUpdate.rejected]: (state, action) => {
    state.loading = false
    state.error = action.payload
  },
})
export const { setAuthChecked, setUser } = userSlice.actions
export default userSlice.reducer
