let we = require('../../../../we/index.js')

new class extends we.Page {
    data() {
        return {
            po: {},
            vo: {
                name: ''
            }
        }
    }

    onLoad(options) {
        this.setData({
            'vo.name': options.name
        })
    }
    toWorkbench() {
        wx.navigateTo({
            url: '/pages/bmem/workbench/index',
        })
    }

    toMyAccount() {
        wx.navigateTo({
            url: '/pages/cmem/account/index',
        })
    }

    toMoreCard() {
        wx.navigateTo({
            url: '/pages/bmem/comp/more/index',
        })
    }


}