const context = require('../../context/Java110Context.js');

const constant = context.constant;

Page({
  data: {
    tableData: [],
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
  getTable: function (page, override) {
    let that = this;
    this.setData({
      loading: true
    })
    return this.request({
      "ownerId": "772019122036600002",
      "communityId": "702019120393220007",
      // "page": page,
      // "row": 10
    }).then(res => {
      that.setData({
        tableData: override ? res.data.ownerRepairs : this.data.tableData.concat(res.data.ownerRepairs),
        totalPage: res.data.records,
        page: page,
        loading: false
      })
    })
  }, 
  goAdd: function (e) {
    wx.navigateTo({
      url: "/pages/family/family"
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
    console.log(1, !this.data.loading,this.data.page < this.data.totalPage);
    // 下拉触底，先判断是否有请求正在进行中
    // 以及检查当前请求页数是不是小于数据总页数，如符合条件，则发送请求
    if (!this.data.loading && this.data.page < this.data.totalPage) {
      this.getTable(this.data.page + 1)
    }
  },
  //封装请求
  request: function (data) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: constant.url.queryOwnerMembers,
        header: context.getHeaders(),
        method: "POST",
        data: data,
        success: function (res) {
          if (res.statusCode == 200) {
            resolve(res);
          }
        }
      })
    })
  },
})