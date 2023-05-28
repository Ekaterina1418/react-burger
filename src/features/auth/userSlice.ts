import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { BASE_URL } from '../../utils/data'
import { AppDispatch, ThunkAPI } from '../store'
import {
  IResetPassword,
  IResponseReset,
  ResponseAuth,
  ResponseToken,
  UpdateUser,
} from '../../utils/types'
import { checkResponse, fetchWithRefresh } from '../../utils/api'

export const checkUserAuth = () => {
  return (dispatch: AppDispatch) => {
    if (localStorage.getItem('accessToken')) {
      dispatch(getUser())
        .catch(() => {
          localStorage.removeItem('accessToken')
          localStorage.removeItem('refreshToken')
          dispatch(setUser(null))
        })
        .finally(() => dispatch(setAuthChecked(true)))
    } else {
      dispatch(setAuthChecked(true))
    }
  }
}

export const registerUser = createAsyncThunk<User, User, ThunkAPI>(
  'auth/registerUser',
  async (form, thunkAPI) => {
    try {
      const data = await fetch(`${BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(form),
      })

      const res = await checkResponse<ResponseAuth>(data)
      localStorage.setItem('accessToken', res.accessToken)
      localStorage.setItem('refreshToken', res.refreshToken)
      return res.user
    } catch (error) {
      return thunkAPI.rejectWithValue((error as { message: string }).message)
    }
  }
)

export const login = createAsyncThunk<User, User, ThunkAPI>(
  'auth/login',

  async ({ email, password }, thunkAPI) => {
    try {
      const data = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({ email, password }),
      })

      const res = await checkResponse<ResponseAuth>(data)
      localStorage.setItem('accessToken', res.accessToken)
      localStorage.setItem('refreshToken', res.refreshToken)
      return res.user
    } catch (error) {
      return thunkAPI.rejectWithValue((error as { message: string }).message)
    }
  }
)

export const getUser = createAsyncThunk<User, void, ThunkAPI>(
  'auth/user',
  async (_, thunkAPI) => {
    try {
      const data = await fetchWithRefresh<ResponseAuth>(
        `${BASE_URL}/auth/user`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
            authorization: localStorage.getItem('accessToken'),
          } as HeadersInit,
        }
      )

      if (!data.success) {
        return thunkAPI.rejectWithValue('Wrong response')
      }

      return data.user
    } catch (error) {
      return thunkAPI.rejectWithValue((error as { message: string }).message)
    }
  }
)

export const logout = createAsyncThunk<IResponseReset, void, ThunkAPI>(
  'auth/logout',
  async (_, thunkAPI) => {
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
     
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
      return await checkResponse<IResponseReset>(data)
      
    } catch (error) {
      return thunkAPI.rejectWithValue((error as { message: string }).message)
    }
  }
)

export const userUpdate = createAsyncThunk<User, User, ThunkAPI>(
  'auth/update',

  async ({ name, email, password }, thunkAPI) => {
    try {
      const data = await fetch(`${BASE_URL}/auth/user`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          authorization: localStorage.getItem('accessToken'),
        } as HeadersInit,
        body: JSON.stringify({ name, email, password }),
      })

      const res = await checkResponse<UpdateUser>(data)

      return res.user
    } catch (error) {
      return thunkAPI.rejectWithValue((error as { message: string }).message)
    }
  }
)
export interface User {
  name?: string
  email: string
  password?: string
}
export interface userState {
  loading: boolean
  user: User | null
  error?: string
  isAuthChecked: boolean
}
export const initialState: userState = {
  loading: false,
  user: null,
  isAuthChecked: false,
}
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuthChecked: (state, action: PayloadAction<boolean>) => {
      state.isAuthChecked = action.payload
    },
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.loading = true
        state.error = undefined
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.loading = false
        state.isAuthChecked = true
        state.user = action.payload
      })
      .addCase(getUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true
        state.error = undefined
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false
        state.isAuthChecked = true
        state.user = action.payload
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(login.pending, (state) => {
        state.loading = true
        state.error = undefined
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false
        state.isAuthChecked = true
        state.user = action.payload
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(logout.pending, (state) => {
        state.loading = true
        state.error = undefined
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.loading = false
        state.isAuthChecked = true
        state.user = null
        state.error = undefined
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(userUpdate.pending, (state) => {
        state.loading = true
        state.error = undefined
      })
      .addCase(userUpdate.fulfilled, (state) => {
        state.loading = false
        state.isAuthChecked = true
      })
      .addCase(userUpdate.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export const { setAuthChecked, setUser } = userSlice.actions
export default userSlice.reducer
