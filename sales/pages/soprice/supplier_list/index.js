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
                scrollViewHeight: 500,
                list: [1, 2, 3, 4, 2, 3, 4, 2, 3, 4]
            }
        }
    }

    onShow(options) {
        console.warn(options)
        let backData = wx.getStorageSync("otherAppBackkData")



        if (backData) {
            wx.showToast({
                title: backData.message+" succ"
            })
            wx.removeStorage({"key": 'otherAppBackkData'})
        }
    }

    onReady() {
        this.$getSystemInfo().then((info)=> {
            this.setData({
                'vo.scrollViewHeight': info.windowHeight - 177
            })
        })
    }

    add() {
        this.$navigateToMiniProgram({
            appId: 'wxd20acafd48bd6dbf',
            path: '/pages/distr/add/index',
            extraData: {from: '销售中心-供应商新建申请'},
            envVersion: 'develop'
        }).then((data)=> {
            console.info("调用成功")
        }).catch((err)=> {
            console.error("调用失败：" + err)
        })
    }
}
