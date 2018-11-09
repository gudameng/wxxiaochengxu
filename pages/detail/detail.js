// pages/detail/detail.js
import store from '../../store/store.js'
import ajax from '../../utils/request.js'
import { addToCartAction } from '../../store/actions/cart.js' 
const app=getApp()
console.log(app.setBadge())
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      'https://img.yzcdn.cn/upload_files/2018/10/25/FlR03uZsGPUXIlRi0tUUeAw_Y5Ty.jpg?imageView2/2/w/750/h/0/q/75/format/webp',
      'https://img.yzcdn.cn/upload_files/2018/10/24/Fgjd1d5o6iCtZwTaZc41QDwCnqWN.jpg?imageView2/2/w/750/h/0/q/75/format/webp',
      'https://img.yzcdn.cn/upload_files/2018/10/24/FnrwlL9RG3WrK1RBtaUbliV8A2Fp.jpg?imageView2/2/w/750/h/0/q/75/format/webp',
      'https://img.yzcdn.cn/upload_files/2018/10/24/FnB1zLaGscDzA6wq2Nb-SfglHcgt.jpg?imageView2/2/w/750/h/0/q/75/format/webp',
      'https://img.yzcdn.cn/upload_files/2018/10/24/FoBy89g5EbtKD0qaF1VuFeAKLluq.jpg?imageView2/2/w/750/h/0/q/75/format/webp'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    count: 0,
    detailContent: {}
  },
  toHome() {
    wx.switchTab({
      url: '../home/home',
    })
  },
  toCart() {
    wx.switchTab({
      url: '../cart/cart',
    })
  },
  addDetailCart(e) {
    const allContent = e.currentTarget.dataset.all;
    const {
      count,
      id,
      money,
      url,
      text
    } = allContent;
    store.dispatch(addToCartAction({
      id,
      money,
      text,
      url,
      count
    }))
    this.getData()
  },
  getData() {
    this.setData({
      count: app.allNum
    })
    console.log(this.data.count)
  },
  addDetail() {
    this.setData({
      detailContent: { ...this.data.detailContent, count: ++this.data.detailContent.count}
    })
  },
  reduceDetail() {
    let detailNum = this.data.detailContent.count -= 1
    if (detailNum < 1) {
      detailNum = 1
    }
    this.setData({
      detailContent: { ...this.data.detailContent, count: detailNum}
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData()
    ajax.get(`http://rap2api.taobao.org/app/mock/116504/api/vi/detail?id=${this.options.id}`)
      .then(resp => {
        this.setData({
          detailContent: resp.data.data
        })
      })
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
    app.setBadge()
    this.getData()
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