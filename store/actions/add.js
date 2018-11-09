import { ADD } from './actionType.js';
export const addShop = (outItem) => {
  return {
    type: ADD,
    payload: {
      outItem
    }
  }
}