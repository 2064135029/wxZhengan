// index.ts
// 获取应用实例
const app = getApp<IAppOption>();
const req = require("../../utils/request");

Page({
  data: {
    needLogin: true,
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse("button.open-type.getUserInfo"),
    canIUseGetUserProfile: false,
    canIUseOpenData:
      wx.canIUse("open-data.type.userAvatarUrl") &&
      wx.canIUse("open-data.type.userNickName"), // 如需尝试获取用户信息可改为false
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: "../logs/logs",
    });
  },
  onLoad() {
    // @ts-ignore
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true,
      });
    }
    let token = wx.getStorageSync("token");
    console.log(token);
    if (token && token != "") {
      console.log("++++++");
      this.setData({
        needLogin: false,
      });
    }
  },
  getUserProfile() {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: "展示用户信息", // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res);
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true,
        });
        wx.login({
          success: (lres) => {
            console.log(lres);
            // 发送 res.code 到后台换取 openId, sessionKey, unionId
            req.request({
              url: "/wx/user/wxlogin",
              params: { js_code: lres.code, ...res.userInfo },
              doFail: () => {},
              doSuccess: (r: any) => {
                // console.log(res);
                wx.setStorageSync("token", r.data.openid);
              },
              complete: () => {},
            });
          },
        });
      },
    });
  },
  getUserInfo(e: any) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    // console.log(e)
    // console.log('+++++++++');
    // this.setData({
    //   userInfo: e.detail.userInfo,
    //   hasUserInfo: true
    // })
    // this.getUserProfile();
    // return;
    // wx.login({
    //   success(res){
    //     console.log(res);
    //     req.request({
    //       url: '/wx/user/wxlogin',
    //       params: {},
    //       doFail: ()=>{
    //       },
    //       doSuccess: (res: any) => {},
    //       complete: () => {}
    //     });
    //   }
    // })
  },
  getPhoneNumber(e: any) {
    console.log(e.detail.code);

    req.request({
      url: "/wx/user/bingWxPhoneNum",
      params: {
        code: e.detail.code,
      },
      doFail: () => {},
      doSuccess: (res: any) => {},
      complete: () => {},
    });
  },
  navToRecord() {
    wx.navigateTo({
      url: "/pages/record/index",
    });
  },
  navToQueInfo() {
    wx.navigateTo({
      url: "/pages/queInfo/index",
    });
  },
});
