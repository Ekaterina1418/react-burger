import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { BASE_URL } from '../../utils/data'
import { TIngredient } from '../../utils/types'
import { ThunkAPI } from '../store'
import axios from 'axios'
import { checkResponse } from '../../utils/api'
interface IResponse {
  data: {
    data: TIngredient[]
    success: true
  }
}

export const fetchIngredients = createAsyncThunk(
  'ingredients/fetchIngredients',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/ingredients`)
   const res = await response.json()
   return res.data
    } catch (error) {
      return rejectWithValue((error as { message: string }).message)
    }
  }
)
export interface ApiState {
  loading: boolean
  ingredients: TIngredient[]
  error: string | null
}
export const initialState: ApiState = {
  loading: false,
  ingredients: [],
  error: null,
}

const apiSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchIngredients.pending, (state) => {
      state.loading = true
      state.error = null
    })
    builder.addCase(
      fetchIngredients.fulfilled,
      (state, action: PayloadAction<TIngredient[]>) => {
        state.loading = false
        state.ingredients = action.payload
        state.error = null
      }
    )
    builder.addCase(
      fetchIngredients.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = false
        state.ingredients = []
        state.error = action.payload
      }
    )
  },
})
export default apiSlice.reducer
