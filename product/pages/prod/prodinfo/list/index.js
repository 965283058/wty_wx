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
                scrollViewHeight: 300,
                list:[1,2]
            }
        }
    }

    onReady() {
        this.$getSystemInfo().then((info)=> {
            this.setData({
                'vo.scrollViewHeight': info.windowHeight - 77
            })
        })
    }

    edit() {
      this.$navigateTo("/pages/prod/prodinfo/add/index")
    }
    add() {
        this.$navigateTo("/pages/prod/prodinfo/add/index")
    }
 
}
