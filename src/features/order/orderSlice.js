import { createSlice } from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit'


import { URL_ORDER } from '../../utils/data'

const initialState = {
  loading: false,
  order: null,
  error: '',
}

export const createOrder = createAsyncThunk(
  'orderes/fetchOrderes',
  async (order, { rejectWithValue }) => {
    try {
      const response = await fetch(`${URL_ORDER}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(order),
      })
      return await response.json()
    } catch (error) {
      return rejectWithValue(error.message)
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
