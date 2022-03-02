const req = require("./utils/request");
// app.ts
App<any>({
  globalData: {
    queInfo: {},
    patientInfo: {},
  },
  onLaunch() {
    // 展示本地存储能力
    // const logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)
    // 登录
    // wx.login({
    //   success: res => {
    //     console.log(res)
    //     // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //     req.request({
    //       url: '/wx/user/wxlogin',
    //       params: {js_code: res.code},
    //       doFail: () => {
    //       },
    //       doSuccess: (res: any) => {
    //         console.log(res);
    //         wx.setStorageSync('token', res.data.openid);
    //        },
    //       complete: () => { }
    //     });
    //   },
    // })
  },
});
