import {TIngredient} from '../../utils/types'
import cartSlice, {
  initialCart,
  addToCart,
  removeIngredient,
  sortingIngredient,
  TConstructorIngredient,
} from './cartSlice'

describe('Constructor slice testing', () => {
  const ingredient: TConstructorIngredient = {
    _id: 'fd2367895478',
    name: 'First',
    type: 'bun',
    proteins: 50,
    fat: 60,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: 'image',
    image_mobile: 'mobile',
    image_large: 'large',
    __v: 0,
    id: '777',
  }

  it('should return the initial state', () => {
    expect(cartSlice(undefined, { type: '' })).toEqual(initialCart)
  })

  it('should handle add to cart', () => {
    const result = cartSlice(initialCart, addToCart(ingredient))
    if (ingredient.type === 'bun') {
      expect(result).toEqual({
        ...initialCart,
        bun: ingredient,
      })
    } else {
      expect(result).toEqual({
        ...initialCart,
        ingredient: [ingredient],
      })
    }
  })
  it('should handle remove ingredient exists', () => {
    const id = '2d4589d'
    let state = {
      ...initialCart,
      id: id,
    }
    const result = cartSlice(state, removeIngredient(id))
    expect(result).toEqual(state)
  })
  

  it('should handle sort ingredient', () => {
    let state = {
      ...initialCart,
      ingredient: [
        ingredient,
        { ...ingredient, id: '777' },
        { ...ingredient, id: '999' },
      ],
    }
    const params = {
      fromIndex: 0,
      toIndex: 1,
    }
    const result = cartSlice(state, sortingIngredient(params))
    expect(result).toEqual({
      ...initialCart,
      ingredient: [
        { ...ingredient, id: '777' },
        ingredient,
        { ...ingredient, id: '999' },
      ],
    })
  })
})
