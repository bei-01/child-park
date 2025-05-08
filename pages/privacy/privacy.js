// pages/privacy/privacy.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    privacy: {
      location: true,
      recommendation: true,
      sync: true
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 从本地存储加载隐私设置
    const privacy = wx.getStorageSync('privacy') || {};
    this.setData({
      privacy: {
        location: privacy.location !== false,
        recommendation: privacy.recommendation !== false,
        sync: privacy.sync !== false
      }
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },

  // 位置信息开关
  onLocationChange: function (e) {
    const value = e.detail.value;
    this.setData({
      'privacy.location': value
    });
    this.savePrivacySettings();
  },

  // 个性化推荐开关
  onRecommendationChange: function (e) {
    const value = e.detail.value;
    this.setData({
      'privacy.recommendation': value
    });
    this.savePrivacySettings();
  },

  // 数据同步开关
  onSyncChange: function (e) {
    const value = e.detail.value;
    this.setData({
      'privacy.sync': value
    });
    this.savePrivacySettings();
  },

  // 保存隐私设置
  savePrivacySettings: function () {
    wx.setStorageSync('privacy', this.data.privacy);
  }
})