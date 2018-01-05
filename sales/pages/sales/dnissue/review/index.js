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
                mode: ''
            }
        }
    }

    onLoad(parmas) {
        if (parmas.mode=='audit') {
            this.setData({'vo.mode': parmas.mode})
            this.$setNavigationBarTitle({
                title: '问题商品审核'
            })
        }
        else if (parmas.mode=='add'){
          this.setData({'vo.mode': parmas.mode})
          this.$setNavigationBarTitle({
            title: '问题商品处理'
          })

        }
         else  {
           this.setData({ 'vo.mode': parmas.mode })
           this.$setNavigationBarTitle({
             title: '问题商品详情'
           })

    }
    }

    showMore() {
        this.setData({'vo.showMore': !this.data.vo.showMore})
    }
    pass(){
      this.$navigateTo('/pages/sales/dnissue/list/index')
    }
    next() {
      this.$navigateTo('/pages/sales/dnissue/list/index')
    }
    submit(){
      this.$navigateTo('/pages/sales/dnissue/list/index')
    }
}
