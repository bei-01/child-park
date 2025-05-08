Page({
  data: {
    currentTab: 'current',
    activities: [
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
    ],
    filteredActivities: []
  },

  onLoad: function() {
    this.filterActivities();
  },

  switchTab: function(e) {
    const tab = e.currentTarget.dataset.tab;
    this.setData({
      currentTab: tab
    });
    this.filterActivities();
  },

  filterActivities: function() {
    const now = new Date();
    now.setHours(0, 0, 0, 0); // 设置时间为当天的0点

    const filtered = this.data.activities.filter(activity => {
      const startDate = new Date(activity.startTime);
      const endDate = new Date(activity.endTime);
      startDate.setHours(0, 0, 0, 0);
      endDate.setHours(0, 0, 0, 0);

      // 进行中：当前时间在活动时间范围内
      const isCurrent = now >= startDate && now <= endDate;
      // 待开始：当前时间早于活动开始时间
      const isUpcoming = now < startDate;
      // 已结束：当前时间晚于活动结束时间
      const isExpired = now > endDate;

      if (this.data.currentTab === 'current') {
        return isCurrent;
      } else if (this.data.currentTab === 'upcoming') {
        return isUpcoming;
      } else {
        return isExpired;
      }
    });

    // 更新活动状态
    const updatedActivities = this.data.activities.map(activity => {
      const startDate = new Date(activity.startTime);
      const endDate = new Date(activity.endTime);
      startDate.setHours(0, 0, 0, 0);
      endDate.setHours(0, 0, 0, 0);

      const isCurrent = now >= startDate && now <= endDate;
      const isUpcoming = now < startDate;
      const isExpired = now > endDate;
      
      return {
        ...activity,
        isExpired: isExpired,
        isUpcoming: isUpcoming,
        isCurrent: isCurrent
      };
    });

    this.setData({
      activities: updatedActivities,
      filteredActivities: filtered
    });
  },

  onActivityTap: function(e) {
    const activityId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/activity-detail/activity-detail?id=${activityId}`
    });
  }
}); 