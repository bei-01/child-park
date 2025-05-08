const app = getApp()

Page({
  data: {
    username: '',
    phone: '',
    password: '',
    confirmPassword: '',
    isAgree: false
  },

  onUsernameInput(e) {
    this.setData({
      username: e.detail.value
    })
  },

  onPhoneInput(e) {
    this.setData({
      phone: e.detail.value
    })
  },

  onPasswordInput(e) {
    this.setData({
      password: e.detail.value
    })
  },

  onConfirmPasswordInput(e) {
    this.setData({
      confirmPassword: e.detail.value
    })
  },

  onAgreementChange(e) {
    this.setData({
      isAgree: e.detail.value.length > 0
    })
  },

  showAgreement() {
    wx.showModal({
      title: '用户协议',
      content: '欢迎使用儿童乐园购票系统...',
      showCancel: false
    })
  },

  validateForm() {
    const { username, phone, password, confirmPassword } = this.data

    if (!username) {
      wx.showToast({
        title: '请输入用户名',
        icon: 'none'
      })
      return false
    }

    if (!phone) {
      wx.showToast({
        title: '请输入手机号',
        icon: 'none'
      })
      return false
    }

    // 验证手机号格式
    if (!/^1[3-9]\d{9}$/.test(phone)) {
      wx.showToast({
        title: '手机号格式不正确',
        icon: 'none'
      })
      return false
    }

    if (!password) {
      wx.showToast({
        title: '请输入密码',
        icon: 'none'
      })
      return false
    }

    if (password.length < 6) {
      wx.showToast({
        title: '密码长度不能少于6位',
        icon: 'none'
      })
      return false
    }

    if (password !== confirmPassword) {
      wx.showToast({
        title: '两次输入的密码不一致',
        icon: 'none'
      })
      return false
    }

    return true
  },

  handleRegister() {
    if (!this.validateForm()) {
      return
    }

    const { username, phone, password } = this.data

    wx.showLoading({
      title: '注册中...'
    })

    wx.request({
      url: `${app.globalData.baseUrl}/api/user/register`,
      method: 'POST',
      data: {
        username,
        phone,
        password
      },
      success: (res) => {
        if (res.data.code === 0) {
          wx.showToast({
            title: '注册成功',
            icon: 'success'
          })

          // 延迟跳转到登录页
          setTimeout(() => {
            wx.navigateBack()
          }, 1500)
        } else {
          wx.showToast({
            title: res.data.message || '注册失败',
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

  goToLogin() {
    wx.navigateBack()
  }
}) 