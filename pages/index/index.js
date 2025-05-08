// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageLoading: true,
    banners: [
      { 
        id: 1, 
        imageUrl: '../../assets/images/imageUrl1.jpg',
        link: '/pages/activity-detail/activity-detail?id=1' 
      },
      { 
        id: 2, 
        imageUrl: '../../assets/images/imageUrl2.jpg',
        link: '/pages/activity-detail/activity-detail?id=2' 
      },
      { 
        id: 3, 
        imageUrl: '../../assets/images/imageUrl3.jpg',
        link: '/pages/activity-detail/activity-detail?id=3' 
      }
    ],
    hotProjects: [
      { 
        id: 1, 
        name: '海洋球', 
        imageUrl: '/frontend/assets/images/project1.jpg'
      },
      { 
        id: 2, 
        name: '室内攀岩', 
        imageUrl: '/frontend/assets/images/project2.jpg'
      },
      { 
        id: 3, 
        name: '滑滑梯', 
        imageUrl: '/frontend/assets/images/project3.jpg'
      }
    ],
    activities: [],
    notices: [
      { 
        id: 1, 
        title: '园区开放时间调整通知', 
        time: '2025-05-01',
        content: '因季节调整，园区开放时间变更为：周一至周五 9:00-17:00，周六周日 8:30-17:30'
      },
      { 
        id: 2, 
        title: '新项目开放公告', 
        time: '2025-02-15',
        content: '全新项目"梦幻城堡"将于本周六正式开放，欢迎小朋友们前来体验！'
      },
      { 
        id: 3, 
        title: '六一儿童节活动预告', 
        time: '2025-02-20',
        content: '六一儿童节期间，园区将举办丰富多彩的庆祝活动，详情请查看活动页面。'
      },
      { 
        id: 4, 
        title: '园区安全提示', 
        time: '2025-02-25',
        content: '请家长朋友们注意看护好孩子，遵守园区安全规定，确保游玩安全。'
      }
    ],
    isLoading: false,
    hasMore: true,
    page: 1,
    pageSize: 2,
    allActivities: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 初始化活动数据
    this.initActivities();
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 0
      })
    }
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
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 0
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
    this.setData({
      pageLoading: true,
      page: 1,
      hasMore: true
    }, () => {
      this.loadActivities();
      wx.stopPullDownRefresh();
      wx.showToast({
        title: '刷新成功',
        icon: 'success',
        duration: 1500
      });
    });
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    if (this.data.hasMore && !this.data.isLoading) {
      this.loadMoreActivities();
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },

  loadBanners() {
    // 模拟数据
    this.setData({
      banners: [
        { id: 1, imageUrl: '/assets/images/banner1.png', link: '/pages/activity/detail?id=1' },
        { id: 2, imageUrl: '/assets/images/banner2.png', link: '/pages/activity/detail?id=2' },
        { id: 3, imageUrl: '/assets/images/banner3.png', link: '/pages/activity/detail?id=3' }
      ]
    })
  },

  loadHotProjects() {
    // 模拟数据
    this.setData({
      hotProjects: [
        { id: 1, name: '旋转木马', imageUrl: '/assets/images/project1.png', price: 30 },
        { id: 2, name: '碰碰车', imageUrl: '/assets/images/project2.png', price: 40 },
        { id: 3, name: '海盗船', imageUrl: '/assets/images/project3.png', price: 50 }
      ]
    })
  },

  loadActivities() {
    const now = new Date();
    now.setHours(0, 0, 0, 0);

    // 过滤出进行中的活动
    const activeActivities = this.data.allActivities
      .filter(activity => {
        const startDate = new Date(activity.startTime);
        const endDate = new Date(activity.endTime);
        startDate.setHours(0, 0, 0, 0);
        endDate.setHours(0, 0, 0, 0);
        return now >= startDate && now <= endDate;
      })
      .sort((a, b) => new Date(b.startTime) - new Date(a.startTime));

    // 获取当前页数据
    const startIndex = 0;
    const endIndex = this.data.pageSize;
    const currentActivities = activeActivities.slice(startIndex, endIndex);

    this.setData({
      activities: currentActivities,
      pageLoading: false,
      hasMore: activeActivities.length > this.data.pageSize,
      page: 1
    });
  },

  loadNotices() {
    // 模拟数据
    this.setData({
      notices: [
        { id: 1, title: '园区开放时间调整通知', time: '2024-05-01' },
        { id: 2, title: '新项目开放公告', time: '2024-05-15' }
      ]
    })
  },

  onBannerTap(e) {
    const { link } = e.currentTarget.dataset
    wx.navigateTo({ url: link })
  },

  onProjectTap(e) {
    const { id } = e.currentTarget.dataset
    wx.navigateTo({ url: `/pages/project/detail?id=${id}` })
  },

  onActivityTap(e) {
    const { id } = e.currentTarget.dataset;
    wx.navigateTo({ 
      url: `/pages/activity-detail/activity-detail?id=${id}` 
    });
  },

  onNoticeTap(e) {
    const id = e.currentTarget.dataset.id;
    console.log('点击公告，ID:', id);
    wx.navigateTo({
      url: `../notice/detail?id=${id}`,
      success: function() {
        console.log('跳转成功');
      },
      fail: function(error) {
        console.error('跳转失败:', error);
        wx.showToast({
          title: '跳转失败',
          icon: 'none'
        });
      }
    });
  },

  navigateToBooking() {
    wx.switchTab({ url: '/pages/booking/booking' })
  },

  navigateToActivities() {
    wx.navigateTo({ url: '/pages/activities/activities' })
  },

  navigateToMap() {
    wx.navigateTo({ url: '/pages/map/map' })
  },

  navigateToProjects() {
    wx.navigateTo({ url: '/pages/projects/projects' })
  },

  loadMoreActivities() {
    if (!this.data.hasMore || this.data.isLoading) return;

    this.setData({ isLoading: true });

    const now = new Date();
    now.setHours(0, 0, 0, 0);

    // 过滤出进行中的活动
    const activeActivities = this.data.allActivities
      .filter(activity => {
        const startDate = new Date(activity.startTime);
        const endDate = new Date(activity.endTime);
        startDate.setHours(0, 0, 0, 0);
        endDate.setHours(0, 0, 0, 0);
        return now >= startDate && now <= endDate;
      })
      .sort((a, b) => new Date(b.startTime) - new Date(a.startTime));

    // 获取下一页数据
    const startIndex = (this.data.page - 1) * this.data.pageSize;
    const endIndex = startIndex + this.data.pageSize;
    const newActivities = activeActivities.slice(startIndex, endIndex);
    const currentActivities = this.data.activities;
    const updatedActivities = [...currentActivities, ...newActivities];

    this.setData({
      activities: updatedActivities,
      isLoading: false,
      hasMore: updatedActivities.length < activeActivities.length,
      page: this.data.page + 1
    });
  },

  // 获取所有活动数据的辅助函数
  getAllActivities() {
    return [
      { 
        id: 1, 
        title: '六一儿童节特惠', 
        imageUrl: '/images/activities/children-day.png',
        startTime: '2025-05-25',
        endTime: '2025-06-01',
        description: '六一儿童节期间，所有游乐项目8折优惠，更有精美礼品相送！',
        isExpired: false
      },
      { 
        id: 2, 
        title: '亲子运动会', 
        imageUrl: '/images/activities/sports.png',
        startTime: '2025-05-01',
        endTime: '2025-05-14',
        description: '增进亲子感情，培养运动习惯。',
        isExpired: false
      },
      { 
        id: 3, 
        title: '科学实验日', 
        imageUrl: '/images/activities/science.png',
        startTime: '2025-04-15',
        endTime: '2025-04-28',
        description: '探索科学奥秘，培养科学思维。',
        isExpired: true
      },
      { 
        id: 4, 
        title: '暑期夏令营', 
        imageUrl: '/images/activities/summer.png',
        startTime: '2025-07-01',
        endTime: '2025-07-14',
        description: '丰富多彩的暑期活动，让孩子们度过一个难忘的假期。',
        isExpired: false
      },
      { 
        id: 5, 
        title: '暑假亲子游特惠', 
        imageUrl: '/images/activities/summer-special.png',
        startTime: '2025-07-15',
        endTime: '2025-08-15',
        description: '暑假期间，亲子套票7折优惠，更有水上乐园免费体验券相送！',
        isExpired: false
      },
      { 
        id: 6, 
        title: '中秋亲子嘉年华', 
        imageUrl: '/images/activities/mid-autumn.png',
        startTime: '2025-09-15',
        endTime: '2025-09-17',
        description: '中秋佳节，与家人一起制作月饼，参与传统游戏，共度美好时光。',
        isExpired: false
      },
      { 
        id: 7, 
        title: '儿童绘画比赛', 
        imageUrl: '/images/activities/drawing.png',
        startTime: '2025-03-15',
        endTime: '2025-03-28',
        description: '激发孩子的创造力，展示绘画才能。',
        isExpired: true
      }
    ];
  },

  // 初始化活动数据
  initActivities() {
    this.setData({
      pageLoading: true,
      allActivities: this.getAllActivities()
    }, () => {
      this.loadActivities();
    });
  }
})