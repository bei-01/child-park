Page({
  data: {
    userInfo: null
  },
  onLoad() {
    const userInfo = wx.getStorageSync('userInfo')
    if (userInfo) {
      this.setData({ userInfo })
    }
  }
}) 