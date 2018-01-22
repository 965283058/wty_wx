Page({
  data:{
    date:'2017-12-10',
    time:'1号'

  },
  bindDateChange:function(e){
    console.log("日期发生改变")
    console.log(e.detail.value)
    this.setData({
      date:e.detail.value
    })
  },
  bindDate1Change: function (e) {
    console.log("日期发生改变")
    console.log(e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
})