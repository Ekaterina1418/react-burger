import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { BASE_URL } from '../../utils/data'
import { ThunkAPI } from '../store'
import {LiveTable} from '../../utils/types'

export const createOrder = createAsyncThunk(
  'orderes/fetchOrderes',
  async (number: number, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/orders/${number}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
      })
      return await response.json()
    } catch (error) {
      return rejectWithValue((error as { message: string }).message)
    }
  }
)

export interface detailsOrderStore {
    loading: boolean
    order: LiveTable | null 
    error?: string
}

const initialState: detailsOrderStore = {
  loading: false,
  order: null
}

const detailsOrderSlice = createSlice({
  name: 'orderes',
  initialState,
  reducers: {},
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



export default detailsOrderSlice.reducer
