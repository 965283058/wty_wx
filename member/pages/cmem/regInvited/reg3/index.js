let we = require('../../../../we/index.js')
new class extends we.Page {
    data() {
        return {
            vo: {
                mobile: ''
            }
        }
    }

    onLoad(option) {
        this.setData({
            'vo.mobile': option.mobile
        })
    }


    toWorkbench() {
        wx.reLaunch({url: '/pages/bmem/workbench/index'})
    }

    toMyAccount() {
        wx.navigateTo({
            url: '/pages/cmem/account/index',
        })
    }
}


