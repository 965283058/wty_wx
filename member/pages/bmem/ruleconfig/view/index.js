let we = require('../../../../we/index.js')

new class extends we.Page {
    data() {
        return {
          array: ['30天', '60天', '90天', '120天'],
          index: 0,
          array1: ['30天', '60天', '90天', '120天'],
          index1: 0,
          array2: ['自动', '主动'],
          index2: 0,
        }
    }

    toCodeRule(){
      this.$navigateTo("/pages/bmem/ruleconfig/coderule/index")
    }
    toPayDayNum(){
        this.$navigateTo("/pages/bmem/ruleconfig/payDayNum/index")
    }
    toProdTypeSelect(){
        this.$navigateTo("/pages/bmem/ruleconfig/prodTypeSelect/index")
    }
    toDayRangSelect(){
        this.$navigateTo("/pages/bmem/ruleconfig/dayRangSelect/index")
    }
    bindPickerChange(e) {
      console.log(e.detail.value),
        this.setData({
          index: e.detail.value
        })
    }
    bindcollectionChange(e) {
      console.log(e.detail.value),
        this.setData({
          index1: e.detail.value
        })
    }
    bindwayChange(e) {
      console.log(e.detail.value),
        this.setData({
          index2: e.detail.value
        })
    }
}
