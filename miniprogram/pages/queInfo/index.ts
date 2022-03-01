// pages/queInfo/index.ts
const req = require("../../utils/request");
// import { request } from "../../utils/request";

Page({
  /**
   * 页面的初始数据
   */
  data: {
    baseInfo: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    wx.setNavigationBarTitle({
      title: "问卷介绍",
    });
    req.request({
      url: "/wx/user/getQueBaseInfo",
      params: {},
      doFail: () => {},
      doSuccess: (res: any) => {
        console.log(res);
        this.setData({
          baseInfo: res.data,
        });
      },
      complete: () => {},
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

  onNext(){
    wx.navigateTo({
      url: "/pages/patient/index",
    });
  }
});
