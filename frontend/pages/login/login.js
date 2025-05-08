const app = getApp()

Page({
  data: {
    username: '',
    password: ''
  },

  onLoad() {
    // 检查是否已经登录
    const token = wx.getStorageSync('token')
    if (token) {
      wx.switchTab({
        url: '/pages/index/index'
      })
    }
  },

  onUsernameInput(e) {
    this.setData({
      username: e.detail.value
    })
  },

  onPasswordInput(e) {
    this.setData({
      password: e.detail.value
    })
  },

  handleLogin() {
    const { username, password } = this.data
    
    // 表单验证
    if (!username || !password) {
      wx.showToast({
        title: '请填写完整信息',
        icon: 'none'
      })
      return
    }

    // 显示加载提示
    wx.showLoading({
      title: '登录中...'
    })

    // 调用登录接口
    wx.request({
      url: `${app.globalData.baseUrl}/api/user/login`,
      method: 'POST',
      data: {
        username,
        password
      },
      success: (res) => {
        if (res.data.code === 0) {
          // 保存token
          wx.setStorageSync('token', res.data.data.token)
          wx.setStorageSync('userInfo', res.data.data.userInfo)
          
          wx.showToast({
            title: '登录成功',
            icon: 'success'
          })

          // 跳转到首页
          wx.switchTab({
            url: '/pages/index/index'
          })
        } else {
          wx.showToast({
            title: res.data.message || '登录失败',
            icon: 'none'
          })
        }
      },
      fail: () => {
        wx.showToast({
          title: '网络错误',
          icon: 'none'
        })
      },
      complete: () => {
        wx.hideLoading()
      }
    })
  },

  goToRegister() {
    wx.navigateTo({
      url: '/pages/register/register'
    })
  },

  goToForgetPassword() {
    wx.navigateTo({
      url: '/pages/forget-password/forget-password'
    })
  }
}) 