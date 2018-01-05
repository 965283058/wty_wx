let we = require('../../../../we/index.js')
new class extends we.Page {
    data() {
        return {
          array1:['普通','黄金','铂金'],
          array: ['私营', '国营','政府机关','合资','外商独资'],
          index:0,
          index1: 0,
            po: {},
            vo: {
                list: [{type:'品牌'},{type:'商标'},{type:'加工方式'},{type:'价格区间'}]
            }
        }
    }

    onReady() {

    }
    toCard(){
    	this.$navigateTo("/pages/bmem/comp/moreCard/index")
    }
    bindPickerChange(e){
      console.log(e.detail.value),
      this.setData({
        index:e.detail.value
      })
    }
    // bindgradleChange(e) {
    //   console.log(e.detail.value),
    //     this.setData({
    //       index1: e.detail.value
    //     })
    // }
}