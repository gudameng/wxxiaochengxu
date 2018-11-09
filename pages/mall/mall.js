// pages/mall/mall.js
import ajax from '../../utils/request.js'
import store from '../../store/store.js'
import { addToCartAction } from '../../store/actions/cart.js'
console.log(store.getState())
Page({
  /**
   * 页面的初始数据
   */
  data: {
    showText: '',
    list: [],
    name: 1,
    listRight: []
  },
  addToCart(e) {
    const allObject = e.currentTarget.dataset.obj
    const {
      id,
      money,
      text,
      url
    } = allObject
    console.log(allObject)
    store.dispatch(addToCartAction({
      id,
      money,
      text,
      url,
      count: 1
    }))
  },
  serviceSelection(e) {
    const m = this.data.list.filter(item => item.id === e.currentTarget.dataset.id)[0]
    this.setData({
      showText: m.text,
      name: m.id
    })
    this.loadList()
  },
  toDetail(e) {
    wx.navigateTo({
      url: `/pages/detail/detail?id=${e.currentTarget.dataset.id}`,
    })
  },
  loadList: function() {
    ajax.get(`http://rap2api.taobao.org/app/mock/116504/api/v1/listright?id=${this.data.name}`)
      .then(resp => {
        this.setData({
          listRight: resp.data.data
        })
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    ajax.get('http://rap2api.taobao.org/app/mock/116504/api/v1/listLeft')
      .then(resp => {
        this.setData({
          list: resp.data.data,
          showText: resp.data.data[0].text,
          name: resp.data.data[0].id
        })
      })
    this.loadList()
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