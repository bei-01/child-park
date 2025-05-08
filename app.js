App({
  globalData: {
    userInfo: null
  },

  onLaunch() {
    // 获取本地存储的用户信息
    const userInfo = wx.getStorageSync('userInfo')
    if (userInfo) {
      this.globalData.userInfo = userInfo
    }

    // 捕获全局错误
    wx.onError((error) => {
      console.error('全局错误：', error)
    })

    // 捕获未处理的Promise错误
    wx.onUnhandledRejection((res) => {
      console.error('未处理的Promise错误：', res.reason)
    })

    // 开启调试模式
    wx.setEnableDebug({
      enableDebug: true
    })
  },

  onError(error) {
    console.error('应用错误：', error)
  }
}) 