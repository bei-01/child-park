// pages/profile/profile.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLoggedIn: false,
    userInfo: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.checkLoginStatus();
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
    this.checkLoginStatus();
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 3
      })
    }
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

  // 检查登录状态
  checkLoginStatus: function() {
    const token = wx.getStorageSync('token');
    const userInfo = wx.getStorageSync('userInfo');
    this.setData({
      isLoggedIn: !!token,
      userInfo: userInfo || {}
    });
  },

  // 跳转到登录页
  goToLogin: function() {
    wx.navigateTo({
      url: '/pages/login/login'
    });
  },

  // 跳转到订单页
  goToOrders: function() {
    wx.navigateTo({
      url: '/pages/order/order'
    });
  },

  // 跳转到账号安全页
  goToSecurity: function() {
    wx.navigateTo({
      url: '/pages/security/security'
    });
  },

  // 跳转到隐私设置页
  goToPrivacy: function() {
    wx.navigateTo({
      url: '/pages/privacy/privacy'
    });
  },

  // 跳转到帮助与反馈页
  goToFeedback: function() {
    wx.navigateTo({
      url: '/pages/feedback/feedback'
    });
  },

  // 跳转到关于我们页
  goToAbout: function() {
    wx.navigateTo({
      url: '/pages/about/about'
    });
  },

  // 登录处理
  onLogin: function() {
    wx.getUserProfile({
      desc: '用于完善用户资料',
      success: (res) => {
        const userInfo = res.userInfo;
        // 模拟获取用户ID
        userInfo.userId = 'USER' + Math.floor(Math.random() * 1000000);
        
        // 保存用户信息
        wx.setStorageSync('userInfo', userInfo);
        this.setData({
          userInfo: userInfo
        });

        wx.showToast({
          title: '登录成功',
          icon: 'success'
        });
      },
      fail: (err) => {
        console.error('登录失败：', err);
        wx.showToast({
          title: '登录失败',
          icon: 'error'
        });
      }
    });
  },

  // 导航到我的订单
  navigateToMyOrders: function() {
    wx.switchTab({
      url: '/pages/order/order'
    });
  },

  // 导航到儿童信息
  navigateToChildren: function() {
    wx.navigateTo({
      url: '/pages/children/children'
    });
  },

  // 导航到设置
  navigateToSettings: function() {
    wx.navigateTo({
      url: '/pages/settings/settings'
    });
  },

  // 导航到帮助与反馈
  navigateToHelp: function() {
    wx.navigateTo({
      url: '/pages/feedback/feedback'
    });
  }
})