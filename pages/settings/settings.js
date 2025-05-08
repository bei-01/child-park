Page({
  data: {
    settings: {
      notification: true,
      location: false
    },
    cacheSize: '0KB',
    version: '1.0.0',
    userInfo: null,
    isLoggedIn: false
  },

  onLoad: function (options) {
    // 检查登录状态
    const token = wx.getStorageSync('token');
    const userInfo = wx.getStorageSync('userInfo');
    
    this.setData({
      isLoggedIn: !!token,
      userInfo: userInfo
    });

    // 从本地存储加载设置
    const settings = wx.getStorageSync('settings') || {};
    this.setData({
      settings: {
        notification: settings.notification !== false,
        location: this.data.isLoggedIn ? (settings.location !== false) : false
      }
    });
    
    // 获取缓存大小
    this.getCacheSize();
  },

  onShow: function() {
    // 每次显示页面时，检查位置信息状态
    const app = getApp();
    if (app.globalData.locationAuthorized) {
      this.setData({
        'settings.location': true
      });
      this.saveSettings();
    }
  },

  // 获取缓存大小
  getCacheSize: function() {
    wx.getStorageInfo({
      success: (res) => {
        const size = res.currentSize;
        let sizeStr = '';
        if (size < 1024) {
          sizeStr = size + 'KB';
        } else {
          sizeStr = (size / 1024).toFixed(2) + 'MB';
        }
        this.setData({
          cacheSize: sizeStr
        });
      }
    });
  },

  // 切换通知开关
  onNotificationChange: function (e) {
    const value = e.detail.value;
    this.setData({
      'settings.notification': value
    });
    this.saveSettings();
  },

  // 切换位置信息开关
  onLocationChange: function (e) {
    if (!this.data.isLoggedIn) {
      wx.showToast({
        title: '请先登录',
        icon: 'none'
      });
      return;
    }

    const value = e.detail.value;
    if (value) {
      // 如果用户要开启位置信息，请求权限
      const app = getApp();
      app.requestLocationPermission();
    } else {
      this.setData({
        'settings.location': false
      });
      this.saveSettings();
    }
  },

  // 保存设置到本地存储
  saveSettings: function () {
    wx.setStorageSync('settings', this.data.settings);
  },

  // 清除缓存
  clearCache: function () {
    wx.showModal({
      title: '提示',
      content: '确定要清除缓存吗？',
      success: (res) => {
        if (res.confirm) {
          wx.clearStorage({
            success: () => {
              this.setData({
                cacheSize: '0KB'
              });
              wx.showToast({
                title: '清除成功',
                icon: 'success'
              });
            }
          });
        }
      }
    });
  },

  // 检查更新
  checkUpdate: function () {
    wx.showLoading({
      title: '检查更新中...'
    });
    
    // 获取小程序更新管理器
    const updateManager = wx.getUpdateManager();
    
    updateManager.onCheckForUpdate(function (res) {
      if (res.hasUpdate) {
        updateManager.onUpdateReady(function () {
          wx.hideLoading();
          wx.showModal({
            title: '更新提示',
            content: '新版本已经准备好，是否重启应用？',
            success: function (res) {
              if (res.confirm) {
                updateManager.applyUpdate();
              }
            }
          });
        });
      } else {
        wx.hideLoading();
        wx.showToast({
          title: '已是最新版本',
          icon: 'success'
        });
      }
    });
  },

  // 跳转到关于我们
  navigateToAbout: function () {
    wx.navigateTo({
      url: '/pages/about/about'
    });
  }
}); 