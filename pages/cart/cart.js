// pages/cart/cart.js
import store from '../../store/store.js'
import { addShop } from '../../store/actions/add.js'
import { reduceShop } from '../../store/actions/reduce.js'
import { clearCart } from '../../store/actions/clearCart.js'

Page({
  /**
   * 页面的初始数据
   */
  data: {
    allDe: [],
    allMoney: 0,
    changebox: []
  },
  
  checkboxChange(e) {
    console.log(e)
  },
  clear() {
    const allContent = this.data.allDe;
    console.log(allContent)
    store.dispatch(clearCart(allContent))
  },
  addCart() {
    this.setData({
      allDe: store.getState().cart.data
    })
    const money = this.data.allDe.reduce((total, item) => {
      return total = parseInt(total) + item.count * item.money
    }, 0)
    this.setData({
      allMoney: money
    })
  },
  addShopping(e) {
    const {
      count,
      id
    } = e.currentTarget.dataset.obj
    store.dispatch(addShop({count,id}))
  },
  reduceShopping(e) {
    const {
      count,
      id
    } = e.currentTarget.dataset.obj
    store.dispatch(reduceShop({ count, id }))
    if(e.currentTarget.dataset.obj.count === 1) {
      wx.showModal({
        title: '购物车',
        content: '你确定要将这件商品从购物车移除吗？',
        success:(res) => {
          if (res.confirm) {
            const nullNum = this.data.allDe.filter(item => item.id !== e.currentTarget.dataset.obj.id)
            this.setData({
              allDe: nullNum
            })
            this.clear()
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.addCart()
    store.subscribe(this.addCart)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})