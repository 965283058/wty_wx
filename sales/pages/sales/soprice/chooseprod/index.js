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
        scrollViewHeight: 300,
        list: [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]
      }
    }
  }

  onReady() {
    this.$getSystemInfo().then((info) => {
      this.setData({
        'vo.scrollViewHeight': info.windowHeight - 240
      })
    })
  }

  add() {
    this.$navigateTo("/pages/supplier/add/index")
  }
  filterStatus(e) {
    this.setData({
      'po.status': e.target.dataset.status
    })

  }
  selectAll(e) {
    let allChecked = e.detail
    let list = this.data.vo.list.fill(allChecked)
    this.setData({
      'vo.list': list
    })
  }
  goprice() {
    this.$navigateTo('/pages/sales/soprice/add/index')
  }

}
