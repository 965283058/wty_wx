let we = require('../../../../we/index.js')

new class extends we.Page {
  data() {
    return {
      po: {},
      vo: {
        scrollViewHeight: 500,
        list: [1, 2, 3, 5, 6, 7, 8, 9]
      }
    }
  }

  onReady() {
    this.$getSystemInfo().then((info) => {
      this.setData({
        'vo.scrollViewHeight': info.windowHeight - 160
      })
    })
  }

  add() {

  }
}
