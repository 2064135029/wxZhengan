// pages/record/index.ts
const req = require("../../utils/request");
const utils = require("../../utils/util");

Page({
  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    page: 1,
    pageSize: 20,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    wx.setNavigationBarTitle({
      title: "问诊记录",
    });
    this.getListData();
  },

  getListData() {
    req.request({
      url: "/wx/user/getReordList",
      params: {
        page: this.data.page,
        pageSize: this.data.pageSize,
      },
      doFail: () => {},
      doSuccess: (res: any) => {
        console.log(res);
        this.setData({
          list: res.data.map((i) => {
            return {
              ...i,
              create_time: utils.formatTime(new Date(i.create_time)),
            };
          }),
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
  onPullDownRefresh() {
    this.setData({
      page: 1,
    });
    this.getListData();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    let p = this.data.page;
    p++;
    this.setData({
      page: p,
    });
    this.getListData();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {},

  onGoBack() {
    wx.navigateBack();
  },
});
