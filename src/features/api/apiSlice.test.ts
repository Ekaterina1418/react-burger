import {TIngredient} from '../../utils/types'
import apiSlice, { initialState, fetchIngredients } from './apiSlice'

describe('Ingredient slice testing', () => {
   it('should return the initial state', () => {
     expect(apiSlice(undefined, { type: '' })).toEqual(initialState)
   })
  it('should handle pending ingredients', () => {
    const state = {
      ...initialState,
    }
    const action = { type: fetchIngredients.pending.type }
    const result = apiSlice(state, action)

    expect(result).toEqual({
      ...initialState,
      loading: true,
      error: null,
    })
  })

  it('should handle fulfilled ingredients', () => {
    const state = {
      ...initialState,
    }

    const ingredients: TIngredient = 
      {
        _id: '643d69a5c3f7b9001cfa093c',
        name: 'Краторная булка N-200i',
        type: 'bun',
        proteins: 80,
        fat: 24,
        carbohydrates: 53,
        calories: 420,
        price: 1255,
        image: 'https://code.s3.yandex.net/react/code/bun-02.png ',
        image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
        image_large: 'https//code.s3.yandex.net/react/code/bun-02-large.png',
        __v: 0,
      }
    
    const action = {
      type: fetchIngredients.fulfilled.type,
      payload: [ingredients],
    }
    const result = apiSlice(state, action)
    expect(result).toEqual({
      ...initialState,
      loading: false,
      ingredients: [ingredients],
      error: null,
    })
  })
  it('should handle rejected ingredients', () => {
    const state = {
      ...initialState,
    }
    const action = {
      type: fetchIngredients.rejected.type,
      payload: "Can't fetch",
    }
    const result = apiSlice(state, action)

    expect(result).toEqual({
      ...initialState,
      loading: false,
      ingredients: [],
      error: "Can't fetch",
    })
  })
})
