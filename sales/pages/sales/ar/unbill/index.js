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
                list: [1, 2],
                mode: '',
                scrollViewHeight: 300
            }
        }
    }

    onReady() {
        let we = this
        var query = wx.createSelectorQuery()
        query.select('.box__foot').boundingClientRect(function (info) {
            let height = info.height
            query.select('.list').boundingClientRect(function (res) {
                we.$getSystemInfo().then((info)=> {
                    we.setData({
                        'vo.scrollViewHeight': info.windowHeight - res.top - height - 2
                    })
                })
            }).exec()
        }).exec()
    }


    submitbill() {
      this.$navigateTo('/pages/sales/ar/bill/list/index')

    }
}
