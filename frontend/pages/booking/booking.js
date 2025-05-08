Page({
  data: {
    date: '',
    timeSlots: []
  },
  onLoad() {
    // 设置默认日期为今天
    const today = new Date()
    const date = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`
    this.setData({ date })
  }
}) 