// pages/order/order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orders: [],
    tabs: ['全部', '待使用', '已完成', '已取消'],
    currentTab: 0,
    loading: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log('订单页面加载')
    this.loadOrders()
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
    console.log('订单页面显示')
    // 每次显示页面时重新加载订单
    this.loadOrders()
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 2
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

  // 切换标签
  onTabChange(e) {
    const index = e.currentTarget.dataset.index
    console.log('切换标签：', index)
    this.setData({
      currentTab: index
    })
    this.loadOrders()
  },

  // 加载订单数据
  loadOrders() {
    console.log('加载订单数据')
    this.setData({ loading: true })

    try {
      // 从本地存储获取订单数据
      const orders = wx.getStorageSync('orders') || []
      console.log('从本地存储加载的订单：', orders)

      // 根据当前标签筛选订单
      let filteredOrders = orders
      if (this.data.currentTab === 1) {
        filteredOrders = orders.filter(order => order.status === '待使用')
      } else if (this.data.currentTab === 2) {
        filteredOrders = orders.filter(order => order.status === '已完成')
      } else if (this.data.currentTab === 3) {
        filteredOrders = orders.filter(order => order.status === '已取消')
      }

      this.setData({
        orders: filteredOrders,
        loading: false
      })
    } catch (e) {
      console.error('加载订单失败：', e)
      wx.showToast({
        title: '加载订单失败',
        icon: 'none'
      })
      this.setData({ loading: false })
    }
  },

  // 取消订单
  cancelOrder(e) {
    const { id } = e.currentTarget.dataset
    console.log('取消订单：', id)
    
    wx.showModal({
      title: '提示',
      content: '确定要取消该订单吗？',
      success: (res) => {
        if (res.confirm) {
          try {
            // 从本地存储获取订单
            const orders = wx.getStorageSync('orders') || []
            // 更新订单状态
            const updatedOrders = orders.map(order => {
              if (order.id === id) {
                return { ...order, status: '已取消' }
              }
              return order
            })
            // 保存更新后的订单
            wx.setStorageSync('orders', updatedOrders)

            wx.showLoading({
              title: '处理中...'
            })

            setTimeout(() => {
              wx.hideLoading()
              wx.showToast({
                title: '订单已取消',
                icon: 'success',
                duration: 2000,
                success: () => {
                  this.loadOrders()
                }
              })
            }, 1000)
          } catch (e) {
            console.error('取消订单失败：', e)
            wx.showToast({
              title: '取消订单失败',
              icon: 'none'
            })
          }
        }
      }
    })
  },

  // 查看订单详情
  viewOrderDetail(e) {
    const { id } = e.currentTarget.dataset
    console.log('查看订单详情：', id)
    wx.navigateTo({
      url: `/pages/order-detail/order-detail?id=${id}`
    })
  }
})