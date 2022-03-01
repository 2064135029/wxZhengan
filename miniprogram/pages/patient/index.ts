// pages/patient/index.ts
const req = require("../../utils/request");

Page({
  /**
   * 页面的初始数据
   */
  data: {
    radio: false,
    genderRadio: false,
    name: "",
    phone: "",
    icon: {
      active: "/images/ok.png",
      normal: "/images/no.png",
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    wx.setNavigationBarTitle({
      title: "基本信息",
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {},

  onChange(event) {
    this.setData({
      radio: event.detail,
    });
  },
  onGenderChange(event) {
    this.setData({
      genderRadio: event.detail,
    });
  },
  onTextNameChange(event) {
    // event.detail 为当前输入的值
    console.log(event.detail);
    this.setData({
      name: event.detail,
    });
  },
  onTextPhoneChange(event) {
    // event.detail 为当前输入的值
    console.log(event.detail);
    this.setData({
      phone: event.detail,
    });
  },
  commitData() {
    console.log("++++++");
    if (!this.data.genderRadio) {
      wx.showToast({
        title: "请选择性别",
        icon: "none",
        duration: 2000,
      });
      return;
    } else if (!this.data.radio) {
      wx.showToast({
        title: "请选择年龄",
        icon: "none",
        duration: 2000,
      });
      return;
    } else if (this.data.name == "") {
      wx.showToast({
        title: "请输入姓名",
        icon: "none",
        duration: 2000,
      });
      return;
    } else if (this.data.phone == "") {
      wx.showToast({
        title: "请输入手机号码",
        icon: "none",
        duration: 2000,
      });
      return;
    }
    req.request({
      url: "/wx/user/savePatient",
      params: {
        name: this.data.name,
        phone: this.data.phone,
        gender: this.data.genderRadio,
        section_age: this.data.radio,
      },
      doFail: () => {},
      doSuccess: (sult: any) => {
        wx.navigateTo({
          url: "/pages/questionnaire/index",
          success: function (res) {
            res.eventChannel.emit("acceptDataFromOpenerPage", {
              data: sult.data,
            });
          },
        });
      },
      complete: () => {},
    });
  },
});
