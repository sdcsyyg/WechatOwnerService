const context = require('../../context/Java110Context.js');

const constant = context.constant;

Page({
  data: {
    tableData: [{
      "complaintId": "882019110351910002",
      "complaintName": "测试工作流",
      "context": "测试工作流",
      "roomId": "752019100965690010",
      "state": "10001",
      "stateName": "处理中",
      "storeId": "402019032924930007",
      "tel": "17797173945",
      "typeCd": "809001",
      "typeCdName": "投诉"
    }, {
      "complaintId": "882019110394400002",
      "complaintName": "测试工作流",
      "context": "测试工作流",
      "roomId": "752019100758260005",
      "state": "10001",
      "stateName": "处理中",
      "storeId": "402019032924930007",
      "tel": "18909874444",
      "typeCd": "809001",
      "typeCdName": "投诉"
    }, {
      "complaintId": "882019110312520003",
      "complaintName": "吴学文",
      "context": "测试工作流",
      "roomId": "752019102597030030",
      "state": "10001",
      "stateName": "处理中",
      "storeId": "402019032924930007",
      "tel": "18909782345",
      "typeCd": "809001",
      "typeCdName": "投诉"
    }],
    page: 1,
    totalPage: 0,
    loading: false
  },
  onLoad: function () {
    this.getTable(1);
  },

  onShow: function () {
    let that = this;
  },
  getTable:function(){
    context.getRooms().then(res=>{
      console.log(res,898989);
      context.request({
        url: constant.url.listComplaints,
        header: context.getHeaders(),
        method: "GET",
        // data: data,
        data: {
          // state: 10001,
          roomId: res.data.rooms[0].roomId,
          page: 1,
          row: 10,
          communityId: res.data.owner.communityId
        },
        success: function (res) {
          if (res.statusCode == 200) {
            console.log(res, 88888888888);
          }
        },
        fail: function (req) {
          console.log(constant.url.listComplaints, req);
        }
      })
    })

  },
  // getTable: function (page, override) {
  //   console.log(888888888);
  //   let that = this;
  //   this.setData({
  //     loading: true
  //   })
  //   return this.request({
  //     storeTypeCd: '800900000003',
  //     storeId: '402019032924930007',
  //     userName: 'wuxw',
  //     userId: '30518940136629616640',
  //     complaintId: '111',
  //     typeCd: '809002',
  //     complaintName: '111',
  //     page: '1',
  //     row: '10',
  //     communityId: '7020181217000001'
  //     // "page": page,
  //     // "row": 10
  //   }).then(res => {
  //     console.log(res,9999999999999)
  //     that.setData({
  //       tableData: override ? res.data.complaints : this.data.tableData.concat(res.data.complaints),
  //       totalPage: res.data.records,
  //       page: page,
  //       loading: false
  //     })
  //   })
  // },
  goAdd: function (e) {
    wx.navigateTo({
      url: "/pages/complaint/complaint"
    })
  },
  gotoDetail: function (e) {
    wx.navigateTo({
      url: "/pages/repairList/detail/detail?item=" + JSON.stringify(e.currentTarget.dataset.item)
    })
  },
  onPullDownRefresh: function () {
    // 上拉刷新
    if (!this.data.loading) {
      this.getTable(1, true).then(() => {
        // 处理完成后，终止下拉刷新
        wx.stopPullDownRefresh()
      })
    }
  },
  onReachBottom: function () {
    console.log(1, !this.data.loading, this.data.page < this.data.totalPage);
    // 下拉触底，先判断是否有请求正在进行中
    // 以及检查当前请求页数是不是小于数据总页数，如符合条件，则发送请求
    if (!this.data.loading && this.data.page < this.data.totalPage) {
      this.getTable(this.data.page + 1)
    }
  },
  //封装请求
  request: function (data) {
    return new Promise((resolve, reject) => {
      context.request({
        url: constant.url.listComplaints,
        header: context.getHeaders(),
        method: "GET",
        data: data,
        success: function (res) {
          if (res.statusCode == 200) {
            resolve(res);
          }
        },
        fail:function(req){
          console.log(constant.url.listComplaints,req);
        }
      })
    })
  },
})