// pages/home/home.js
import ajax from '../../utils/request.js';
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      'https://img.yzcdn.cn/upload_files/2018/10/26/FgR9RqueHpTRmMC5vaubAGHRFYnf.gif?imageView2/2/w/730/h/0/q/75/format/gif/unoptimize/1',
      'https://img.yzcdn.cn/upload_files/2018/10/18/Fs9ii1u2pmCqjtMcCqP_zHt7suzr.png?imageView2/2/w/730/h/0/q/75/format/webp',
      'https://img.yzcdn.cn/upload_files/2018/10/18/Fizs6j963fTwUCTCV_gganOyjsVv.jpg?imageView2/2/w/730/h/0/q/75/format/webp',
      'https://img.yzcdn.cn/upload_files/2018/09/04/FpGNMr6x_hUnyckaCb6T8964fR5m.png?imageView2/2/w/730/h/0/q/75/format/webp'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    list: [],
    page: 1,
    total: 0
  },
  /**
   * 生命周期函数--监听页面加载
   */
  toDetail(e) {
    wx.navigateTo({
      url: `/pages/detail/detail?id=${e.currentTarget.dataset.id}`,
    })
  },
  loadList: function() {
    if (this.data.page === this.data.total) {
      return;
    }
    ajax.get('http://rap2api.taobao.org/app/mock/116504/api/v1/homelist')
      .then(resp => {
        this.setData({
          list: this.data.list.concat(resp.data.data),
          page: this.data.page + 1,
          total: resp.data.page.total
        })
      })
      .catch(error => {
        console.log(error)
      })
  },
  loadMore() {
    this.loadList()
  },
  onLoad: function (options) {
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
    app.setBadge()
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