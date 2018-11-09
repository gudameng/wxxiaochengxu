//app.js
import store from './store/store.js'

App({
  onLaunch: function () {
    this.setBadge()
    store.subscribe(this.setBadge)
  },
  onShow(){
    this.setBadge()
  },
  allNum:0,
  setBadge() {
    this.allNum = store.getState().cart.data.reduce((total, num) => { 
      total +=  num.count
      return total
      },0);
    // }
    wx.setTabBarBadge({
      index: 2,
      text: `${this.allNum}`,
    })
  }
})