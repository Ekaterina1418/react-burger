import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {v4 as uuidv4} from 'uuid'
import {TIngredient} from "../../utils/types";

 export  type TConstructorIngredient = TIngredient & { id: string };

export interface CartState {
    bun: TConstructorIngredient | null
    ingredient: TConstructorIngredient[]
}

const initialCart: CartState = {
    bun: null,
    ingredient: [],
}

const cartSlice = createSlice({
    name: 'cart',
    initialState: initialCart,
    reducers: {
        addToCart: (state, action: PayloadAction<TConstructorIngredient>) => {
            if (action.payload.type === 'bun') {
                state.bun = action.payload
            } else {
                state.ingredient.push(action.payload)
            }
        },
        removeBun(state) {
            state.bun = null
        },
        removeIngredient(state, action: PayloadAction<string>) {
            const index = state.ingredient.findIndex(
                (item) => item.id !== action.payload
            )
            if (index === -1) {
                return
            }
            state.ingredient.splice(index, 1)
        },
        sortingIngredient(state, action: PayloadAction<{ fromIndex: number, toIndex: number }>) {
            state.ingredient.splice(
                action.payload.toIndex,
                0,
                state.ingredient.splice(action.payload.fromIndex, 1)[0]
            )
        },
    },
})

export const {addToCart, removeBun, removeIngredient, sortingIngredient} =
    cartSlice.actions
export default cartSlice.reducer
