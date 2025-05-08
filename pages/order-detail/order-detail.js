Page({
  data: {
    order: null
  },

  onLoad(options) {
    const { id } = options
    this.loadOrderDetail(id)
  },

  // 加载订单详情
  loadOrderDetail(id) {
    try {
      const orders = wx.getStorageSync('orders') || []
      const order = orders.find(order => order.id === id)
      
      if (order) {
        this.setData({ order })
      } else {
        wx.showToast({
          title: '订单不存在',
          icon: 'none'
        })
        setTimeout(() => {
          wx.navigateBack()
        }, 1500)
      }
    } catch (e) {
      console.error('加载订单详情失败：', e)
      wx.showToast({
        title: '加载失败',
        icon: 'none'
      })
    }
  },

  // 取消订单
  cancelOrder() {
    wx.showModal({
      title: '提示',
      content: '确定要取消该预约吗？',
      success: (res) => {
        if (res.confirm) {
          try {
            const orders = wx.getStorageSync('orders') || []
            const updatedOrders = orders.map(order => {
              if (order.id === this.data.order.id) {
                return { ...order, status: '已取消' }
              }
              return order
            })
            wx.setStorageSync('orders', updatedOrders)

            wx.showLoading({
              title: '处理中...'
            })

            setTimeout(() => {
              wx.hideLoading()
              wx.showToast({
                title: '预约已取消',
                icon: 'success',
                duration: 2000,
                success: () => {
                  setTimeout(() => {
                    wx.navigateBack()
                  }, 2000)
                }
              })
            }, 1000)
          } catch (e) {
            console.error('取消预约失败：', e)
            wx.showToast({
              title: '取消失败',
              icon: 'none'
            })
          }
        }
      }
    })
  }
}); 