Page({
  data: {
    projects: [
      {
        id: 1,
        name: '海洋球',
        imageUrl: '/images/projects/carousel.jpg'
      },
      {
        id: 2,
        name: '城堡探险',
        imageUrl: '/images/projects/ferris-wheel.jpg'
      },
      {
        id: 3,
        name: '室内攀岩',
        imageUrl: '/images/projects/roller-coaster.jpg'
      },
      {
        id: 4,
        name: '水上滚球',
        imageUrl: '/images/projects/bumper-cars.jpg'
      }
    ]
  },

  onLoad: function() {
    // 页面加载时的逻辑
  },

  onProjectTap: function(e) {
    const projectId = e.currentTarget.dataset.id;
    // 这里可以添加点击项目后的跳转逻辑
    wx.showToast({
      title: '项目详情开发中',
      icon: 'none'
    });
  }
}); 