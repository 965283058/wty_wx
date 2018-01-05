let we = require('../../../../we/index.js')


new class extends we.Page {
    data() {
        return {
            po: {mobile: '13544567789'},
            vo: {
                scrollViewHeight: 260,
                list:[1,2,3,4]
            }
        }
    }
    addDept() {
      //AJAX保存公司信息
      //跳转保存成功页面
      this.$navigateTo("/pages/bmem/department/add/index")
    }


}
