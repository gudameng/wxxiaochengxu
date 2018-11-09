import { CLEAR_CART } from './actionType.js'
export const clearCart = (clear) => {
  return {
    type: CLEAR_CART,
    payload: {
      clear
    }
  }
}