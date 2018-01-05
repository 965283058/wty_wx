let we = require('../../../we/index.js')
// let urls = require('../util/map.js')
// let apis = require('../apis/user')
// let toast = require('../../weui/toast/index')
// let mix = require('../util/mix')

new class extends we.Page {
    data() {
        return {
            po: {},
            vo: {
                list:[1,2,3,1,2,3],
                mode: '',
                scrollViewHeight:300
            }
        }
    }
    onReady() {
        this.$getSystemInfo().then((info)=> {
            this.setData({
                'vo.scrollViewHeight': info.windowHeight - 300
            })
        })
    }

    showMore() {

    }
}
