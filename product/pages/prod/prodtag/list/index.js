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
                scrollViewHeight:100,
                list:[1,2,3]
            }
        }
    }

    onReady() {
        this.$getSystemInfo().then((info)=> {
            this.setData({
                'vo.scrollViewHeight': info.windowHeight - 160
            })
        })
    }

    add() {
        this.$navigateTo("/pages/prod/prodtag/add/index")
    }
    edit() {
      this.$navigateTo("/pages/prod/prodtag/add/index?id=1000")
    }
}
