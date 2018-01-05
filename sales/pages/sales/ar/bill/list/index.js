let we = require('../../../../../we/index.js')
// let urls = require('../util/map.js')
// let apis = require('../apis/user')
// let toast = require('../../weui/toast/index')
// let mix = require('../util/mix')

new class extends we.Page {
    data() {
        return {
            po: {
                status: ''
            },
            vo: {
                list: [1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6],
                scrollViewHeight: 300
            }
        }
    }

    onReady() {
        let we = this
        var query = wx.createSelectorQuery()
        query.select('.list').boundingClientRect(function (res) {
            we.$getSystemInfo().then((info)=> {
                we.setData({
                    'vo.scrollViewHeight': info.windowHeight - res.top - 3
                })
            })
        }).exec()
    }


    filterStatus(e) {
        this.setData({
            'po.status': e.target.dataset.status
        })

    }
    pub(){
      this.$navigateTo('/pages/sales/ar/bill/pub/index')
    }
    rec() {
      this.$navigateTo('/pages/sales/ar/bill/rec/index')
    }
    review() {
      this.$navigateTo('/pages/sales/ar/bill/review/index')
    }
}
