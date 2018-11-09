import
{ ADD_TO_CART,
  ADD,
  REDUCE,
  CLEAR_CART
} from '../actions/actionType.js'
const initState = {
  data: wx.getStorageSync("cart") || []
}
export default (state = initState, action) => {
  switch(action.type) {
    case ADD_TO_CART:
      const { cartItem } = action.payload;
      const isInCart = state.data.some(item => item.id === cartItem.id);
      const { data } =state;
      let newData = [];
      if(isInCart) {
        newData = data.map(item => {
          if(item.id === cartItem.id) {
            item.count += cartItem.count;
          }
          return item;
        })
      } else {
        newData = data.concat({
          ...cartItem,
          checkbox: false
        })
      }
      wx.setStorageSync('cart', newData)
      return Object.assign({}, state, {
        data: newData
      });
    case ADD:
      const { outItem } = action.payload;
      const  newOutItem = state.data.map(item => {
          if(item.id === outItem.id) {
            item.count += 1;
          }
          return item
        });
      wx.setStorageSync('cart', newOutItem);
      return Object.assign({}, state, {
        data: newOutItem
      });
    case REDUCE:
      const { reduceItem } = action.payload;
      const newReuceItem = state.data.map(item => {
        if(item.id === reduceItem.id) {
          item.count -= 1;
          if(item.count < 1) {
            item.count = 1
          }
        }
        return item
      });
      wx.setStorageSync('cart', newReuceItem);
      return Object.assign({}, state, {
        data: newReuceItem
      });
    case CLEAR_CART:
      const newClearData = action.payload.clear
      wx.setStorageSync('cart', newClearData)
      return Object.assign({}, state, {
        data: newClearData
      })
    default:
      return state;
  }
  return state
}