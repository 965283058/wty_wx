let we = require('../../../../we/index.js')
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
                scrollViewHeight: 500,
                list: [1, 2, 3, 5, 6, 7, 8, 9]
            }
        }
    }

    onReady() {
        let we = this
        var query = wx.createSelectorQuery()
        query.select('.scroll-box').boundingClientRect(function (res) {
            we.$getSystemInfo().then((info)=> {
                we.setData({
                    'vo.scrollViewHeight': info.windowHeight - res.top - 3
                })
            })
        }).exec()

        this.$getSystemInfo().then((info)=> {
            this.setData({
                'vo.scrollViewHeight': info.windowHeight - 92
            })
        })
    }

    add() {
      this.$navigateTo("/pages/sales/dnissue/deal/index?mode=add")
    }
    audit() {
      this.$navigateTo("/pages/sales/dnissue/deal/index?mode=audit")
    }
    done() {
      this.$navigateTo("/pages/sales/dnissue/review/index?mode=done")
    }

    filterStatus(e) {
        this.setData({
            'po.status': e.target.dataset.status
        })

    }
}
