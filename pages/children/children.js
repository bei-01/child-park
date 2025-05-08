// pages/children/children.js
Page({
  data: {
    childrenList: [],
    showModal: false,
    editingChild: null,
    formData: {
      name: '',
      age: '',
      height: '',
      gender: '男',
      guardianPhone: '',
      healthNote: ''
    },
    genderOptions: ['男', '女']
  },

  onLoad: function() {
    // 加载保存的儿童信息
    this.loadChildrenList();
  },

  // 加载儿童列表
  loadChildrenList: function() {
    const childrenList = wx.getStorageSync('childrenList') || [];
    this.setData({ childrenList });
  },

  // 显示添加儿童弹窗
  showAddChildModal: function() {
    this.setData({
      showModal: true,
      editingChild: null,
      formData: {
        name: '',
        age: '',
        height: '',
        gender: '男',
        guardianPhone: '',
        healthNote: ''
      }
    });
  },

  // 显示编辑儿童弹窗
  editChild: function(e) {
    const id = e.currentTarget.dataset.id;
    const child = this.data.childrenList.find(item => item.id === id);
    if (child) {
      this.setData({
        showModal: true,
        editingChild: child,
        formData: {
          name: child.name || '',
          age: child.age,
          height: child.height,
          gender: child.gender || '男',
          guardianPhone: child.guardianPhone || '',
          healthNote: child.healthNote || ''
        }
      });
    }
  },

  // 隐藏弹窗
  hideModal: function() {
    this.setData({
      showModal: false,
      editingChild: null,
      formData: {
        name: '',
        age: '',
        height: '',
        gender: '男',
        guardianPhone: '',
        healthNote: ''
      }
    });
  },

  // 输入处理函数
  onNameInput: function(e) {
    this.setData({
      'formData.name': e.detail.value
    });
  },

  onAgeInput: function(e) {
    this.setData({
      'formData.age': e.detail.value
    });
  },

  onHeightInput: function(e) {
    this.setData({
      'formData.height': e.detail.value
    });
  },

  onGenderChange: function(e) {
    this.setData({
      'formData.gender': this.data.genderOptions[e.detail.value]
    });
  },

  onGuardianPhoneInput: function(e) {
    this.setData({
      'formData.guardianPhone': e.detail.value
    });
  },

  onHealthNoteInput: function(e) {
    this.setData({
      'formData.healthNote': e.detail.value
    });
  },

  // 提交表单
  submitForm: function() {
    const { name, age, height, gender, guardianPhone, healthNote } = this.data.formData;
    
    // 验证输入
    if (!name) {
      wx.showToast({
        title: '请填写儿童姓名',
        icon: 'none'
      });
      return;
    }

    if (!age || !height) {
      wx.showToast({
        title: '请填写年龄和身高',
        icon: 'none'
      });
      return;
    }

    if (!guardianPhone) {
      wx.showToast({
        title: '请填写监护人电话',
        icon: 'none'
      });
      return;
    }

    // 验证手机号格式
    if (!/^1[3-9]\d{9}$/.test(guardianPhone)) {
      wx.showToast({
        title: '请输入正确的手机号',
        icon: 'none'
      });
      return;
    }

    // 验证年龄和身高的合理性
    if (age < 0 || age > 18) {
      wx.showToast({
        title: '请输入合理的年龄',
        icon: 'none'
      });
      return;
    }

    if (height < 50 || height > 200) {
      wx.showToast({
        title: '请输入合理的身高',
        icon: 'none'
      });
      return;
    }

    let childrenList = [...this.data.childrenList];
    
    if (this.data.editingChild) {
      // 编辑现有儿童信息
      const index = childrenList.findIndex(item => item.id === this.data.editingChild.id);
      if (index !== -1) {
        childrenList[index] = {
          ...childrenList[index],
          name,
          age: Number(age),
          height: Number(height),
          gender,
          guardianPhone,
          healthNote
        };
      }
    } else {
      // 添加新儿童信息
      const newChild = {
        id: Date.now().toString(),
        name,
        age: Number(age),
        height: Number(height),
        gender,
        guardianPhone,
        healthNote
      };
      childrenList.push(newChild);
    }

    // 保存更新后的列表
    wx.setStorageSync('childrenList', childrenList);
    this.setData({ childrenList });

    // 隐藏弹窗并显示提示
    this.hideModal();
    wx.showToast({
      title: this.data.editingChild ? '修改成功' : '添加成功',
      icon: 'success'
    });
  },

  // 删除儿童信息
  deleteChild: function(e) {
    const id = e.currentTarget.dataset.id;
    
    wx.showModal({
      title: '确认删除',
      content: '确定要删除这条儿童信息吗？',
      success: (res) => {
        if (res.confirm) {
          let childrenList = this.data.childrenList.filter(item => item.id !== id);
          wx.setStorageSync('childrenList', childrenList);
          this.setData({ childrenList });
          
          wx.showToast({
            title: '删除成功',
            icon: 'success'
          });
        }
      }
    });
  }
}); 