Component({
  data: {
    selected: 0,
    color: "#999999",
    selectedColor: "#07c160",
    list: [{
      pagePath: "/pages/index/index",
      text: "首页",
      icon: "home"
    }, {
      pagePath: "/pages/booking/booking",
      text: "预约",
      icon: "calendar"
    }, {
      pagePath: "/pages/order/order",
      text: "订单",
      icon: "list"
    }, {
      pagePath: "/pages/profile/profile",
      text: "我的",
      icon: "user"
    }]
  },
  attached() {
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      wx.switchTab({
        url
      })
      this.setData({
        selected: data.index
      })
    }
  }
}) 