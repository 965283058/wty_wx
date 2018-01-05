let we = require('../../../../we/index.js')
new class extends we.Page {
    data() {
        return {
          array:['私营', '国营', '政府机关', '合资', '外商独资'],
          index:0,
            po: {},
            vo: {
                list: [{type:'品牌'},{type:'商标'},{type:'加工方式'},{type:'价格区间'}]
            }
        }
    }

    onReady() {

    }
    toSave(){
        //AJAX保存公司信息
    	//跳转保存成功页面
    	this.$navigateTo("/pages/bmem/employee/list/index")
    }
    
}