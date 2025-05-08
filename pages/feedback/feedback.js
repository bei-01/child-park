Page({
  data: {
    selectedType: 'bug',
    content: '',
    contact: '',
    images: [],
    canSubmit: false
  },

  // 选择反馈类型
  selectType: function(e) {
    const type = e.currentTarget.dataset.type;
    this.setData({
      selectedType: type
    });
    this.checkCanSubmit();
  },

  // 输入反馈内容
  onContentInput: function(e) {
    this.setData({
      content: e.detail.value
    });
    this.checkCanSubmit();
  },

  // 输入联系方式
  onContactInput: function(e) {
    this.setData({
      contact: e.detail.value
    });
  },

  // 选择图片
  chooseImage: function() {
    const that = this;
    wx.chooseImage({
      count: 3 - that.data.images.length,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function(res) {
        that.setData({
          images: that.data.images.concat(res.tempFilePaths)
        });
      }
    });
  },

  // 预览图片
  previewImage: function(e) {
    const index = e.currentTarget.dataset.index;
    wx.previewImage({
      current: this.data.images[index],
      urls: this.data.images
    });
  },

  // 删除图片
  deleteImage: function(e) {
    const index = e.currentTarget.dataset.index;
    const images = this.data.images;
    images.splice(index, 1);
    this.setData({
      images: images
    });
  },

  // 检查是否可以提交
  checkCanSubmit: function() {
    const canSubmit = this.data.content.trim().length > 0;
    this.setData({
      canSubmit: canSubmit
    });
  },

  // 提交反馈
  submitFeedback: function() {
    if (!this.data.canSubmit) {
      return;
    }

    wx.showLoading({
      title: '提交中...'
    });

    // 上传图片
    const uploadPromises = this.data.images.map(path => {
      return new Promise((resolve, reject) => {
        wx.uploadFile({
          url: 'YOUR_UPLOAD_API_URL',
          filePath: path,
          name: 'file',
          success: res => resolve(res.data),
          fail: err => reject(err)
        });
      });
    });

    // 提交反馈信息
    Promise.all(uploadPromises)
      .then(imageUrls => {
        return wx.request({
          url: 'YOUR_FEEDBACK_API_URL',
          method: 'POST',
          data: {
            type: this.data.selectedType,
            content: this.data.content,
            contact: this.data.contact,
            images: imageUrls
          }
        });
      })
      .then(() => {
        wx.hideLoading();
        wx.showToast({
          title: '提交成功',
          icon: 'success',
          duration: 2000
        });
        setTimeout(() => {
          wx.navigateBack();
        }, 2000);
      })
      .catch(err => {
        wx.hideLoading();
        wx.showToast({
          title: '提交失败',
          icon: 'error'
        });
        console.error('提交反馈失败：', err);
      });
  }
}); 