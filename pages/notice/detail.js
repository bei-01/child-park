Page({
  data: {
    notice: null
  },

  onLoad(options) {
    const { id } = options;
    // 模拟获取公告详情
    const notices = [
      { 
        id: 1, 
        title: '园区开放时间调整通知', 
        time: '2024-05-01',
        content: '因季节调整，园区开放时间变更为：周一至周五 9:00-17:00，周六周日 8:30-17:30'
      },
      { 
        id: 2, 
        title: '新项目开放公告', 
        time: '2024-05-15',
        content: '全新项目"梦幻城堡"将于本周六正式开放，欢迎小朋友们前来体验！'
      },
      { 
        id: 3, 
        title: '六一儿童节活动预告', 
        time: '2024-05-20',
        content: '六一儿童节期间，园区将举办丰富多彩的庆祝活动，详情请查看活动页面。'
      },
      { 
        id: 4, 
        title: '园区安全提示', 
        time: '2024-05-25',
        content: '请家长朋友们注意看护好孩子，遵守园区安全规定，确保游玩安全。'
      }
    ];
    
    const notice = notices.find(item => item.id === parseInt(id));
    if (notice) {
      this.setData({ notice });
    } else {
      wx.showToast({
        title: '公告不存在',
        icon: 'error'
      });
      setTimeout(() => {
        wx.navigateBack();
      }, 1500);
    }
  },

  onBack() {
    wx.navigateBack();
  }
}); 