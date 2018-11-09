import { ADD_TO_CART } from './actionType.js'
export const addToCartAction = (cartItem) => {
  return {
    type: ADD_TO_CART,
    payload: {
      cartItem
    }
  }
}