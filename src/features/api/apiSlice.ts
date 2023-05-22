import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { BASE_URL } from '../../utils/data'
import { TIngredient } from '../../utils/types'

export const fetchIngredients = createAsyncThunk(
  'ingredients/fetchIngredients',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${BASE_URL}/ingredients`)
      return response.data.data
    } catch (error:any) {
      return thunkAPI.rejectWithValue(error.message)
    }
  }
)
export interface ApiState {
  loading: boolean
  ingredients: TIngredient[]
  error: string | null
}
const initialState:ApiState = {
  loading: false,
  ingredients: [],
  error: null,
}

const apiSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers:{},
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
    builder.addCase(fetchIngredients.rejected, (state, action: PayloadAction<any>) => {
      state.loading = false
      state.ingredients = []
      state.error = action.payload
    })
  },
})
export default apiSlice.reducer
