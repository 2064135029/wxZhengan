// pages/questionnaire/index.ts
const req = require("../../utils/request");

Page({
  /**
   * 页面的初始数据
   */
  data: {
    icon: {
      active: "/images/ok.png",
      normal: "/images/no.png",
    },
    topicData: [],
    isFinshAnswer: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    // const eventChannel = this.getOpenerEventChannel();
    // if (eventChannel) {
    //   eventChannel.on("acceptDataFromOpenerPage", function (data) {
    //     console.log(data);
    //   });
    // }
    req.request({
      url: "/wx/user/getWxTopic",
      params: {},
      doFail: () => {},
      doSuccess: (res: any) => {
        console.log(res);
        this.setData({
          topicData: res.data,
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
  onChange(e) {
    // console.log(e);
    // console.log(e.detail);
    const currentItem = e.currentTarget.dataset.item;
    // console.log(currentItem);
    const answer = e.detail;
    // console.log(answer);
    let newArr = [];
    if (currentItem.type == 3) {
      // 其他输入
      newArr = this.data.topicData.map((i: any) => {
        if (i.id == currentItem.id) {
          return {
            ...i,
            isAnswer: true,
            inputValue: answer,
          };
        }
        return i;
      });
    } else {
      newArr = this.data.topicData.map((i: any) => {
        if (i.id == currentItem.id) {
          return {
            ...i,
            isAnswer: true,
            sub: i.sub.map((k: any) => {
              // console.log(k);
              if (i.type == 1) {
                // 单选
                if (k.id == answer.id) {
                  return {
                    ...k,
                    active: true,
                  };
                }
                return {
                  ...k,
                  active: false,
                };
              } else if (i.type == 2) {
                // 多选
                if (k.id == answer.id) {
                  return {
                    ...k,
                    active: !k.active,
                  };
                }
                return k;
              }
              return k;
            }),
          };
        }
        return i;
      });
    }

    this.setData({
      topicData: newArr,
    });
  },
  onFinsh() {
    let count = 0;
    this.data.topicData.forEach((p: any) => {
      if (p.isAnswer) {
        count++;
      }
    });
    if (count != this.data.topicData.length) {
      wx.showToast({
        title: "请回答所有问题，谢谢！",
        icon: "none",
      });
      return;
    }

    this.setData({
      isFinshAnswer: true,
    });
  },
  navToResult() {
    let ast = [];
    this.data.topicData.forEach((tt: any) => {
      tt.sub.forEach((tk: any) => {
        ast.push({
          idCate: tk.id_cate,
          idSubClass: tk.id_subclass,
          grade: tk.grade,
        });
      });
    });

    const reqParams = {
      queId: getApp().globalData.queInfo.id,
      patientId: getApp().globalData.patientInfo.id,
      answerss: ast,
    };

    req.request({
      url: "/wx/user/calculate",
      params: reqParams,
      doFail: () => {},
      doSuccess: (sult: any) => {
        console.log(sult);
        wx.navigateTo({
          url: "/pages/result/index",
          success: function (res) {
            res.eventChannel.emit("acceptDataFromQue", {
              data: sult.data,
            });
          },
        });
      },
      complete: () => {},
    });
  },
});
