Page({
  data: {
    activity: null
  },

  onLoad: function(options) {
    const activityId = parseInt(options.id);
    // 这里应该从服务器获取活动详情
    // 为了演示，我们使用模拟数据
    const activities = [
      {
        id: 1,
        title: '六一儿童节特惠',
        imageUrl: '/images/activities/children-day.png',
        startTime: '2025-05-25',
        endTime: '2025-06-01',
        description: '六一儿童节期间，所有游乐项目8折优惠，更有精美礼品相送！活动期间，每天上午9:00-17:00开放，凭活动券可享受优惠。活动期间还将举办抽奖活动，有机会获得精美玩具和游乐项目免费体验券。',
        isExpired: false
      },
      {
        id: 2,
        title: '亲子运动会',
        imageUrl: '/images/activities/sports.png',
        startTime: '2025-05-01',
        endTime: '2025-05-14',
        description: '增进亲子感情，培养运动习惯。本次活动为期两周，每天上午9:00-11:00，下午15:00-17:00开放。活动包括趣味接力赛、亲子跳绳、趣味投篮等多个项目，让家长和孩子一起享受运动的乐趣。',
        isExpired: false
      },
      {
        id: 3,
        title: '科学实验日',
        imageUrl: '/images/activities/science.png',
        startTime: '2025-04-15',
        endTime: '2025-04-28',
        description: '探索科学奥秘，培养科学思维。本次活动为期两周，每天上午10:00-12:00，下午14:00-16:00开放。孩子们可以在专业老师的指导下，进行各种有趣的科学实验，了解科学原理，培养探索精神。',
        isExpired: true
      },
      {
        id: 4,
        title: '暑期夏令营',
        imageUrl: '/images/activities/summer.png',
        startTime: '2025-07-01',
        endTime: '2025-07-14',
        description: '丰富多彩的暑期活动，让孩子们度过一个难忘的假期。夏令营期间，每天上午9:00-17:00开放，包括户外探险、手工制作、科学实验、团队游戏等多个项目。专业的老师将全程陪伴，确保孩子们的安全和快乐。',
        isExpired: false
      },
      {
        id: 5,
        title: '暑假亲子游特惠',
        imageUrl: '/images/activities/summer-special.png',
        startTime: '2025-07-15',
        endTime: '2025-08-15',
        description: '暑假期间，亲子套票7折优惠，更有水上乐园免费体验券相送！活动期间，每天上午9:00-21:00开放，包括所有游乐项目和水上乐园。购买亲子套票还可获得精美纪念品一份。',
        isExpired: false
      },
      {
        id: 6,
        title: '中秋亲子嘉年华',
        imageUrl: '/images/activities/mid-autumn.png',
        startTime: '2025-09-15',
        endTime: '2025-09-17',
        description: '中秋佳节，与家人一起制作月饼，参与传统游戏，共度美好时光。活动期间，每天上午10:00-21:00开放，包括月饼制作、猜灯谜、投壶游戏等传统活动。晚上还有精彩的文艺表演和烟花秀。',
        isExpired: false
      },
      {
        id: 7,
        title: '儿童绘画比赛',
        imageUrl: '/images/activities/drawing.png',
        startTime: '2025-03-15',
        endTime: '2025-03-28',
        description: '激发孩子的创造力，展示绘画才能。本次活动为期两周，每天上午10:00-12:00，下午14:00-16:00开放。孩子们可以在专业老师的指导下，使用各种绘画工具创作自己的作品。活动结束后将举办作品展览，并评选出优秀作品。',
        isExpired: true
      }
    ];

    const activity = activities.find(a => a.id === activityId);
    if (activity) {
      // 检查活动状态
      const now = new Date();
      now.setHours(0, 0, 0, 0);
      const startDate = new Date(activity.startTime);
      const endDate = new Date(activity.endTime);
      startDate.setHours(0, 0, 0, 0);
      endDate.setHours(0, 0, 0, 0);

      activity.isCurrent = now >= startDate && now <= endDate;
      activity.isUpcoming = now < startDate;
      activity.isExpired = now > endDate;

      this.setData({
        activity: activity
      });
    } else {
      wx.showToast({
        title: '活动不存在',
        icon: 'error'
      });
      setTimeout(() => {
        wx.navigateBack();
      }, 1500);
    }
  }
}); 