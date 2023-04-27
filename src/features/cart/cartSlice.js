import {  createSlice } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'


// export interface CartState {
//   bun: TIngredient
//   ingredient: TIngredient[]
// }

const initialCart = {
  bun: null,
  ingredient: [],
}

const cartSlice = createSlice({
  name: 'cart',
  initialState: initialCart,
  reducers: {
    addToCart: {
      prepare: (ingredient) => ({
        payload: { ...ingredient, id: uuidv4() },
      }),
      reducer: (state, action) => {
        if (action.payload.type === 'bun') {
          state.bun = action.payload
        } else {
          state.ingredient.push(action.payload)
        }
      },
    },
    removeBun(state) {
      state.bun = null
    },
    removeIngredient(state, action) {
       const index = state.ingredient.filter(
        (item) => item.id !== action.payload
      )
      if(index === -1) {
        return
      }
      state.ingredient.splice(index,1)
    },
    sortingIngredient(state, action) {
      state.ingredient.splice(
        action.payload.toIndex,
        0,
        state.ingredient.splice(action.payload.fromIndex, 1)[0]
      )
    },
  },
})

export const { addToCart, removeBun, removeIngredient, sortingIngredient } =
  cartSlice.actions
export default cartSlice.reducer
