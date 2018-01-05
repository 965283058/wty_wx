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
                showMore: false
            }
        }
    }


    next() {
      this.$navigateTo("/pages/sales/soc/rec/index")

    }
    rec() {
      this.$navigateTo("/pages/sales/soc/list/index")

    }
    close() {
      this.$navigateTo("/pages/sales/soc/list/index")

    }
    showMore() {
        this.setData({'vo.showMore': !this.data.vo.showMore})
    }
}
