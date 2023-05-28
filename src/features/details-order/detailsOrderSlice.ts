import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { BASE_URL } from '../../utils/data'
import { ThunkAPI } from '../store'
import { TOrderInfo, TOrdersResponse } from '../../utils/types'
import { checkResponse } from '../../utils/api'

export const getOrder = createAsyncThunk<TOrderInfo[], number, ThunkAPI>(
  'orders/fetchOrder',
  async (number: number, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/orders/${number}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
      })
      const res = await checkResponse<
        TOrdersResponse & { success: string; message?: string }
      >(response)

      if (!res.success) {
        return rejectWithValue(res.message as string)
      }

      return res.orders
    } catch (error) {
      return rejectWithValue((error as { message: string }).message)
    }
  }
)

export interface detailsOrderStore {
  loading: boolean
  orders: Array<TOrderInfo>
  error?: string
}

export const initialState: detailsOrderStore = {
  loading: false,
  orders: [],
}

const detailsOrderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getOrder.pending, (state) => {
      state.loading = true
    })
    builder.addCase(getOrder.fulfilled, (state, action) => {
      state.loading = false
      state.orders = action.payload
      state.error = ''
    })
    builder.addCase(getOrder.rejected, (state, action) => {
      state.loading = false
      state.orders = []
      state.error = action.payload
    })
  },
})

export default detailsOrderSlice.reducer
