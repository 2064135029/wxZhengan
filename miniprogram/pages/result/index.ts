// pages/result/index.ts
import * as echarts from "../../ec-canvas/echarts";

let chart = null;

function initChart(canvas, width, height, dpr) {
  chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr, // new
  });
  canvas.setChart(chart);
  // console.log(recordData);
  var option = {
    xAxis: {
      type: "category",
      data: [],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: [],
        type: "bar",
        showBackground: true,
        backgroundStyle: {
          color: "rgba(180, 180, 180, 0.2)",
        },
      },
    ],
  };
  // option.series[0].data = recordData;
  chart.setOption(option);
  return chart;
}

Page({
  /**
   * 页面的初始数据
   */
  data: {
    patientInfo: {
      name: "***",
    },
    sumInfo: "",
    ec: {
      onInit: initChart,
    },
    echartCateData: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    const eventChannel = this.getOpenerEventChannel();
    const that = this;
    if (eventChannel) {
      eventChannel.on("acceptDataFromQue", function (data) {
        console.log(data.data);
        const echartCateData = data.data.echartCateData;
        let sum = [];
        const d = echartCateData.map((i) => {
          sum.push(i.name);
          return i.grade;
        });
        // console.log(d);
        that.setData({
          name: getApp().globalData.patientInfo.name,
          echartCateData: echartCateData,
          sumInfo: sum.join("、"),
        });
        var option = {
          xAxis: {
            type: "category",
            data: [],
          },
          yAxis: {
            type: "value",
          },
          series: [
            {
              data: d,
              type: "bar",
              showBackground: true,
              backgroundStyle: {
                color: "rgba(180, 180, 180, 0.2)",
              },
            },
          ],
        };
        setTimeout(() => {
          // console.log(chart);
          chart.setOption(option);
        }, 1000);
        // chart.setOption(option);
      });
    }
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

  echartInit(e) {
    console.log(e);
    let recordData = e.target.dataset.record;
    initChart(e.detail.canvas, e.detail.width, e.detail.height, recordData);
  },
});
