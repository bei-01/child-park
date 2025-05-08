// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: '',
    code: '',
    countdown: 0,
    isCounting: false,
    canGetCode: true,
    canLogin: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

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

  // 输入手机号
  onPhoneInput(e) {
    const phone = e.detail.value;
    const canGetCode = this.validatePhone(phone);
    this.setData({
      phone,
      canGetCode,
      canLogin: canGetCode && this.data.code.length === 6
    });
  },

  // 输入验证码
  onCodeInput(e) {
    const code = e.detail.value;
    this.setData({
      code,
      canLogin: this.validatePhone(this.data.phone) && code.length === 6
    });
  },

  // 验证手机号
  validatePhone(phone) {
    return /^1[3-9]\d{9}$/.test(phone);
  },

  // 获取验证码
  async getVerificationCode() {
    if (!this.data.canGetCode || this.data.isCounting) return;

    try {
      // 调用获取验证码接口
      const res = await wx.cloud.callFunction({
        name: 'sendVerificationCode',
        data: {
          phone: this.data.phone
        }
      });

      if (res.result.success) {
        this.startCountdown();
        wx.showToast({
          title: '验证码已发送',
          icon: 'success'
        });
      } else {
        wx.showToast({
          title: res.result.message || '发送失败',
          icon: 'none'
        });
      }
    } catch (error) {
      console.error('获取验证码失败：', error);
      wx.showToast({
        title: '发送失败，请重试',
        icon: 'none'
      });
    }
  },

  // 开始倒计时
  startCountdown() {
    this.setData({
      isCounting: true,
      countdown: 60
    });

    const timer = setInterval(() => {
      if (this.data.countdown <= 1) {
        clearInterval(timer);
        this.setData({
          isCounting: false,
          countdown: 0
        });
      } else {
        this.setData({
          countdown: this.data.countdown - 1
        });
      }
    }, 1000);
  },

  // 登录
  async handleLogin() {
    if (!this.data.canLogin) return;

    try {
      wx.showLoading({
        title: '登录中...',
        mask: true
      });

      // 调用登录接口
      const res = await wx.cloud.callFunction({
        name: 'login',
        data: {
          phone: this.data.phone,
          code: this.data.code
        }
      });

      if (res.result.success) {
        // 保存用户信息和token
        wx.setStorageSync('token', res.result.token);
        wx.setStorageSync('userInfo', res.result.userInfo);

        wx.showToast({
          title: '登录成功',
          icon: 'success',
          duration: 1500
        });

        // 延迟跳转，让用户看到成功提示
        setTimeout(async () => {
          try {
            // 请求位置信息权限
            const app = getApp();
            await app.requestLocationPermission();
            
            wx.showToast({
              title: '位置信息已获取',
              icon: 'success'
            });
          } catch (error) {
            console.error('位置信息授权失败：', error);
            wx.showToast({
              title: '位置信息获取失败',
              icon: 'none'
            });
          }

          // 跳转到设置页面
          wx.reLaunch({
            url: '/pages/settings/settings'
          });
        }, 1500);
      } else {
        wx.showToast({
          title: res.result.message || '登录失败',
          icon: 'none'
        });
      }
    } catch (error) {
      console.error('登录失败：', error);
      wx.showToast({
        title: '登录失败，请重试',
        icon: 'none'
      });
    } finally {
      wx.hideLoading();
    }
  },

  // 跳转到注册页面
  goToRegister() {
    wx.navigateTo({
      url: '/pages/register/register'
    });
  }
})