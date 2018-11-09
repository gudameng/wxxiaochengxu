import { REDUCE } from './actionType.js'
export const reduceShop = (reduceItem) => {
  return {
    type: REDUCE,
    payload: {
      reduceItem
    }
  }
}