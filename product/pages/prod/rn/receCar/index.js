//logs.js
var util = require('../../../../utils/date.js')
Page({
  data: {
    spll: []
  },
  onLoad: function () {
    this.setData({
      util: (wx.getStorageSync('spll') || []).map(function (spll) {
        return util.formatTime(new Date(spll))
      })
    })
  }
})