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
                showMore: false
            }
        }
    }

    onReady() {

    }

    add() {

    }
    showMore() {
        this.setData({'vo.showMore': !this.data.vo.showMore})
    }
}
