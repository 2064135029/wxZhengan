// const app = getApp<IAppOption>()

// import baseUrl from './api';

interface opt {
  url: string;
  params: any;
  doFail: (err: any) => void;
  doSuccess: (res: any) => void;
  complete: () => void;
}

const baseUrl = "http://127.0.0.1:7001";

function request(options: opt) {
  // url, params, doSuccess, doFail, complete
  let token = wx.getStorageSync("token");
  options.params.token = token;
  wx.request({
    url: baseUrl + options.url,
    data: options.params,
    method: "POST",
    header: {
      "content-type": "application/json", // 默认值
    },
    success(res: any) {
      console.log(res.data);
      if (res.data.status === 0) {
        options.doSuccess(res.data);
      } else {
        if (res.data.status === 3) {
          // token 失效
          getToken(options);
        } else if (res.data.status === 4) {
          // token缺少
          getToken(options);
        } else if (res.data.status === 10 || res.data.status === 20) {
          wx.redirectTo({
            url: "/pages/login/login",
          });
        } else {
          options.doFail(res.data.msg);
        }
      }
    },
    fail(err) {
      options.doFail(err);
    },
    complete: options.complete,
  });
}

function getToken(options: any) {
  wx.login({
    success(res) {
      if (res.code) {
        //发起网络请求
        let params: any = {};
        params.js_code = res.code;
        wx.request({
          url: baseUrl + "/wx/user/login", //仅为示例，并非真实的接口地址
          data: params,
          method: "POST",
          header: {
            "content-type": "application/json", // 默认值
          },
          success(res: any) {
            console.log(res.data);
            if (res.data.status === 0) {
              // 验证成功
              wx.setStorage({
                key: "token",
                data: res.data.data.token, //需要存储的token数据
              });
              // 重新请求
              request(options);
            } else {
              if (res.data.status === 10 || res.data.status === 20) {
                wx.redirectTo({
                  url: "/pages/login/login",
                });
              } else {
                wx.showToast({
                  title: `${res.data.msg} `,
                  icon: "none",
                });
              }
            }
          },
          fail(err) {},
          complete() {},
        });
      } else {
        wx.showToast({
          title: `${res.errMsg} `,
          icon: "none",
        });
      }
    },
  });
}

// export default request;

module.exports.request = request;
