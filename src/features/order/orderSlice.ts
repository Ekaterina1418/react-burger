import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { BASE_URL } from '../../utils/data'
import { ThunkAPI } from '../store'
export interface Order {
  name: string
  order: {
    number: number
  }
  success: boolean
}
export interface orderState {
  loading: boolean
  order: Order | null
  error?: string
}
const initialState: orderState = {
  loading: false,
  order: null,
}

export const createOrder = createAsyncThunk(
  'orderes/fetchOrderes',
  async (order:{ingredients:string[]}, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          authorization: localStorage.getItem('accessToken'),
        } as HeadersInit,
        body: JSON.stringify(order),
      })
      return await response.json()
    } catch (error) {
      return rejectWithValue((error as { message: string }).message)
    }
  }
)

const orderSlice = createSlice({
  name: 'orderes',
  initialState,
  reducers: {
    resetOrder: (state) => {
      state.order = null
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createOrder.pending, (state) => {
      state.loading = true
    })
    builder.addCase(createOrder.fulfilled, (state, action) => {
      state.loading = false
      state.order = action.payload
      state.error = ''
    })
    builder.addCase(createOrder.rejected, (state, action) => {
      state.loading = false
      state.order = null
      state.error = action.error.message
    })
  },
})

export const { resetOrder } = orderSlice.actions

export default orderSlice.reducer
