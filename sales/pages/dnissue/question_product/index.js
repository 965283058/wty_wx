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
                mode: ''
            }
        }
    }

    onLoad(parmas) {
        if (parmas.mode) {
            this.setData({'vo.mode': parmas.mode})
            this.$setNavigationBarTitle({
                title: '问题商品审核'
            })
        }else{
            this.$setNavigationBarTitle({
                title: '问题商品处理'
            })
        }

    }

    showMore() {
        this.setData({'vo.showMore': !this.data.vo.showMore})
    }
}
