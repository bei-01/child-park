const app = getApp()

Page({
  data: {
    banners: [],
    hotProjects: [],
    activities: [],
    notices: []
  },

  onLoad() {
    this.loadBanners()
    this.loadHotProjects()
    this.loadActivities()
    this.loadNotices()
  },

  onPullDownRefresh() {
    Promise.all([
      this.loadBanners(),
      this.loadHotProjects(),
      this.loadActivities(),
      this.loadNotices()
    ]).then(() => {
      wx.stopPullDownRefresh()
    })
  },

  // 加载轮播图数据
  loadBanners() {
    return new Promise((resolve, reject) => {
      wx.request({
        url: `${app.globalData.baseUrl}/api/banners`,
        success: (res) => {
          if (res.data.code === 0) {
            this.setData({
              banners: res.data.data
            })
          }
          resolve()
        },
        fail: reject
      })
    })
  },

  // 加载热门项目
  loadHotProjects() {
    return new Promise((resolve, reject) => {
      wx.request({
        url: `${app.globalData.baseUrl}/api/projects/hot`,
        success: (res) => {
          if (res.data.code === 0) {
            this.setData({
              hotProjects: res.data.data
            })
          }
          resolve()
        },
        fail: reject
      })
    })
  },

  // 加载活动列表
  loadActivities() {
    return new Promise((resolve, reject) => {
      wx.request({
        url: `${app.globalData.baseUrl}/api/activities/latest`,
        success: (res) => {
          if (res.data.code === 0) {
            this.setData({
              activities: res.data.data
            })
          }
          resolve()
        },
        fail: reject
      })
    })
  },

  // 加载公告列表
  loadNotices() {
    return new Promise((resolve, reject) => {
      wx.request({
        url: `${app.globalData.baseUrl}/api/notices`,
        success: (res) => {
          if (res.data.code === 0) {
            this.setData({
              notices: res.data.data
            })
          }
          resolve()
        },
        fail: reject
      })
    })
  },

  // 轮播图点击
  onBannerClick(e) {
    const { id } = e.currentTarget.dataset
    wx.navigateTo({
      url: `/pages/banner-detail/banner-detail?id=${id}`
    })
  },

  // 功能区跳转
  goToBooking() {
    wx.switchTab({
      url: '/pages/booking/booking'
    })
  },

  goToTickets() {
    wx.navigateTo({
      url: '/pages/tickets/tickets'
    })
  },

  goToActivities() {
    wx.navigateTo({
      url: '/pages/activities/activities'
    })
  },

  goToMap() {
    wx.navigateTo({
      url: '/pages/map/map'
    })
  },

  // 项目相关跳转
  goToProjects() {
    wx.navigateTo({
      url: '/pages/projects/projects'
    })
  },

  goToProjectDetail(e) {
    const { id } = e.currentTarget.dataset
    wx.navigateTo({
      url: `/pages/project-detail/project-detail?id=${id}`
    })
  },

  // 活动相关跳转
  goToActivityDetail(e) {
    const { id } = e.currentTarget.dataset
    wx.navigateTo({
      url: `/pages/activity-detail/activity-detail?id=${id}`
    })
  },

  // 公告相关
  showNoticeDetail(e) {
    const { id } = e.currentTarget.dataset
    wx.navigateTo({
      url: `/pages/notice-detail/notice-detail?id=${id}`
    })
  }
}) 