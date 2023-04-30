import { createSlice } from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { URL } from '../../utils/data'

export const fetchIngredients = createAsyncThunk(
  'ingredients/fetchIngredients',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(URL)
      return response.data.data
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)
// export interface ApiState {
//   loading: boolean
//   ingredients: TIngredient[]
//   error: string | null
// }
const initialState = {
  loading: false,
  ingredients: [],
  error: null,
}

const apiSlice = createSlice({
  name: 'ingredients',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchIngredients.pending, (state) => {
      state.loading = true
      state.error = null
    })
    builder.addCase(fetchIngredients.fulfilled, (state, action) => {
      state.loading = false
      state.ingredients = action.payload
      state.error = null
    })
    builder.addCase(fetchIngredients.rejected, (state, action) => {
      state.loading = false
      state.ingredients = []
      state.error = action.error.message
    })
  },
})
export default apiSlice.reducer
