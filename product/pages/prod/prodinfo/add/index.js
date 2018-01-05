let we = require('../../../../we/index.js')
// let urls = require('../util/map.js')
// let apis = require('../apis/user')
// let toast = require('../../weui/toast/index')
// let mix = require('../util/mix')

new class extends we.Page {
    data() {
        return {
            po: {},
            vo: {
                list: [{type:'品牌'},{type:'商标'},{type:'加工方式'},{type:'价格区间'}]
            }
        }
    }

    onReady() {

    }
    add(){
    }
    save(){
      this.$navigateTo("/pages/prod/prodinfo/addSucc/index");
    }
}
