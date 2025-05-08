// pages/booking/booking.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: '',
    timeSlots: [
      { id: 1, time: '09:00-10:00', available: true },
      { id: 2, time: '10:00-11:00', available: true },
      { id: 3, time: '11:00-12:00', available: true },
      { id: 4, time: '13:00-14:00', available: true },
      { id: 5, time: '14:00-15:00', available: true },
      { id: 6, time: '15:00-16:00', available: true },
      { id: 7, time: '16:00-17:00', available: true }
    ],
    selectedTimeSlot: null,
    visitorCount: 1,
    contactName: '',
    contactPhone: '',
    remarks: '',
    children: [], // 从本地存储获取的儿童信息
    selectedDate: '',
    selectedTime: '',
    selectedChildren: [],
    maxChildren: 3, // 最大预约人数
    minDate: '', // 最小可选日期（今天）
    maxDate: '', // 最大可选日期（7天后）
    ticketPrice: 0, // 门票单价改为0元
    totalPrice: 0, // 总价
    selectedPayment: 'wechat', // 默认选择微信支付
    canPay: true, // 默认设置为可支付状态
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log('预约页面加载')
    // 设置日期范围
    const today = new Date()
    const maxDate = new Date()
    maxDate.setDate(today.getDate() + 7) // 7天后

    const formatDate = (date) => {
      const year = date.getFullYear()
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const day = String(date.getDate()).padStart(2, '0')
      return `${year}-${month}-${day}`
    }

    this.setData({
      selectedDate: formatDate(today),
      minDate: formatDate(today),
      maxDate: formatDate(maxDate)
    }, () => {
      // 在数据更新后计算总价
      this.calculateTotalPrice();
    })
    
    // 页面加载时也加载儿童信息
    this.loadChildrenData()
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
    console.log('预约页面显示')
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 1
      })
    }
    // 每次显示页面时获取最新的儿童信息
    this.loadChildrenData();
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

  onDateChange(e) {
    console.log('日期变更：', e.detail.value)
    this.setData({
      date: e.detail.value,
      selectedTimeSlot: null
    })
    this.loadTimeSlots()
  },

  onTimeSlotSelect(e) {
    const { id } = e.currentTarget.dataset
    console.log('选择时间段：', id)
    const timeSlots = this.data.timeSlots.map(slot => ({
      ...slot,
      selected: slot.id === id
    }))
    this.setData({
      timeSlots,
      selectedTimeSlot: id
    })
  },

  onVisitorCountChange(e) {
    console.log('游客数量变更：', e.detail.value)
    this.setData({
      visitorCount: parseInt(e.detail.value) + 1
    })
  },

  onContactNameInput(e) {
    this.setData({
      contactName: e.detail.value
    })
  },

  onContactPhoneInput(e) {
    this.setData({
      contactPhone: e.detail.value
    })
  },

  onRemarksInput(e) {
    this.setData({
      remarks: e.detail.value
    })
  },

  loadTimeSlots() {
    console.log('加载时间段数据')
    // 模拟加载时间段数据
    const timeSlots = this.data.timeSlots.map(slot => ({
      ...slot,
      available: Math.random() > 0.3
    }))
    this.setData({ timeSlots })
  },

  submitBooking() {
    console.log('提交预约')
    const { selectedDate, selectedTime, selectedChildren, selectedChildrenInfo } = this.data

    if (!selectedTime) {
      wx.showToast({
        title: '请选择预约时间',
        icon: 'none'
      })
      return
    }

    if (selectedChildren.length === 0) {
      wx.showToast({
        title: '请选择儿童',
        icon: 'none'
      })
      return
    }

    // 创建订单信息
    const order = {
      id: Date.now().toString(), // 使用时间戳作为订单ID
      type: '预约',
      date: selectedDate,
      time: selectedTime,
      visitorCount: selectedChildrenInfo.length, // 游客数量
      children: selectedChildrenInfo, // 儿童信息
      status: '待使用',
      createTime: new Date().toLocaleString() // 使用本地时间格式
    }

    // 保存订单到本地存储
    try {
      const orders = wx.getStorageSync('orders') || []
      orders.unshift(order) // 将新订单添加到列表开头
      wx.setStorageSync('orders', orders)

      wx.showLoading({
        title: '提交中...'
      })

      // 模拟提交
      setTimeout(() => {
        wx.hideLoading()
        wx.showToast({
          title: '预约成功',
          icon: 'success',
          duration: 2000,
          success: () => {
            setTimeout(() => {
              wx.switchTab({
                url: '/pages/order/order'
              })
            }, 2000)
          }
        })
      }, 1500)
    } catch (e) {
      console.error('保存订单失败：', e)
      wx.showToast({
        title: '预约失败，请重试',
        icon: 'none'
      })
    }
  },

  // 选择日期
  bindDateChange(e) {
    const selectedDate = e.detail.value
    // 验证日期是否在有效范围内
    const today = new Date()
    const selected = new Date(selectedDate)
    const maxDate = new Date()
    maxDate.setDate(today.getDate() + 7)

    if (selected < today) {
      wx.showToast({
        title: '不能选择过去的日期',
        icon: 'none'
      })
      return
    }

    if (selected > maxDate) {
      wx.showToast({
        title: '只能预约7天内的日期',
        icon: 'none'
      })
      return
    }

    this.setData({ selectedDate }, () => {
      // 更新支付状态
      this.calculateTotalPrice();
    })
  },

  // 选择时间
  bindTimeChange(e) {
    const selectedTime = e.detail.value
    // 验证时间是否有效
    const [hours, minutes] = selectedTime.split(':').map(Number)
    const now = new Date()
    const selected = new Date(this.data.selectedDate)
    selected.setHours(hours, minutes)

    if (selected < now) {
      wx.showToast({
        title: '不能选择过去的时间',
        icon: 'none'
      })
      return
    }

    if (hours < 9 || hours >= 17) {
      wx.showToast({
        title: '预约时间必须在9:00-17:00之间',
        icon: 'none'
      })
      return
    }

    this.setData({ selectedTime }, () => {
      // 更新支付状态
      this.calculateTotalPrice();
    })
  },

  // 选择儿童
  selectChild(e) {
    const { id } = e.currentTarget.dataset;
    const selectedChildren = [...this.data.selectedChildren];
    const index = selectedChildren.indexOf(id);
    
    if (index > -1) {
      // 如果已经选中，则取消选中
      selectedChildren.splice(index, 1);
    } else {
      // 如果未选中，则添加到选中列表
      if (selectedChildren.length < this.data.maxChildren) {
        selectedChildren.push(id);
      } else {
        wx.showToast({
          title: `最多选择${this.data.maxChildren}人`,
          icon: 'none'
        });
        return;
      }
    }
    
    // 获取选中的儿童信息
    const selectedChildrenInfo = this.data.children.filter(child => 
      selectedChildren.includes(child.id)
    );
    
    console.log('========== 选择儿童 ==========');
    console.log('选中的ID列表：', selectedChildren);
    console.log('选中的儿童信息：', selectedChildrenInfo);
    console.log('选中的儿童数量：', selectedChildrenInfo.length);
    console.log('============================');
    
    this.setData({ 
      selectedChildren,
      selectedChildrenInfo
    }, () => {
      // 在数据更新后计算总价
      this.calculateTotalPrice();
    });
  },

  // 跳转到添加儿童页面
  navigateToAddChild() {
    wx.navigateTo({
      url: '/pages/children/children'
    });
  },

  // 从本地存储加载儿童信息
  loadChildrenData() {
    try {
      const childrenList = wx.getStorageSync('childrenList') || [];
      console.log('从本地存储加载的儿童信息：', childrenList);
      if (childrenList && childrenList.length > 0) {
        // 转换数据格式，添加性别信息
        const children = childrenList.map(child => ({
          ...child,
          gender: child.gender || '男' // 使用存储的性别，如果没有则默认为男
        }));
        this.setData({ 
          children: children,
          selectedChildren: [] // 重置选中的儿童
        });
        console.log('儿童信息设置成功，当前数据：', this.data.children);
      } else {
        console.log('本地存储中没有儿童信息');
        this.setData({ children: [] });
      }
    } catch (e) {
      console.error('加载儿童信息失败：', e);
      wx.showToast({
        title: '加载儿童信息失败',
        icon: 'none'
      });
    }
  },

  // 计算总价
  calculateTotalPrice() {
    const total = this.data.ticketPrice * this.data.selectedChildren.length;
    // 修改判断逻辑：只要有选择儿童、日期和时间就可以支付
    const canPay = this.data.selectedChildren.length > 0 && this.data.selectedDate && this.data.selectedTime;
    
    console.log('计算总价：', {
      total,
      selectedDate: this.data.selectedDate,
      selectedTime: this.data.selectedTime,
      selectedChildren: this.data.selectedChildren.length,
      canPay
    });
    
    this.setData({
      totalPrice: total,
      canPay: canPay
    });
  },

  // 选择支付方式
  selectPayment(e) {
    const paymentType = e.currentTarget.dataset.type;
    this.setData({
      selectedPayment: paymentType
    });
  },

  // 处理支付
  handlePayment() {
    if (!this.data.canPay) return;
    
    console.log('========== 支付前数据 ==========');
    console.log('选中的儿童ID：', this.data.selectedChildren);
    console.log('选中的儿童信息：', this.data.selectedChildrenInfo);
    console.log('选中的儿童数量：', this.data.selectedChildrenInfo.length);
    console.log('============================');
    
    wx.showLoading({
      title: '处理中...',
    });

    // 创建订单信息
    const orderData = {
      date: this.data.selectedDate,
      time: this.data.selectedTime,
      children: this.data.selectedChildrenInfo,
      visitorCount: this.data.selectedChildrenInfo.length,
      totalPrice: this.data.totalPrice,
      paymentMethod: this.data.selectedPayment,
      status: '待使用',
      createTime: new Date().toLocaleString()
    };

    console.log('========== 订单数据 ==========');
    console.log('订单信息：', orderData);
    console.log('============================');

    // 模拟支付过程
    setTimeout(() => {
      wx.hideLoading();
      
      // 保存订单到本地存储
      try {
        const orders = wx.getStorageSync('orders') || [];
        const newOrder = {
          ...orderData,
          id: Date.now().toString(),
          type: '预约'
        };
        
        console.log('========== 新订单数据 ==========');
        console.log('新订单：', newOrder);
        console.log('============================');
        
        orders.unshift(newOrder);
        wx.setStorageSync('orders', orders);

        wx.showToast({
          title: '预约成功',
          icon: 'success',
          duration: 2000
        });
        
        // 支付成功后的处理
        setTimeout(() => {
          wx.switchTab({
            url: '/pages/order/order'
          });
        }, 2000);
      } catch (e) {
        console.error('保存订单失败：', e);
        wx.showToast({
          title: '订单保存失败',
          icon: 'none'
        });
      }
    }, 1500);
  },

  // 监听选择变化，重新计算总价
  onSelectionChange() {
    this.calculateTotalPrice();
  }
})