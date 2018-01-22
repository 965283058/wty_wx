let we = require('./we/index.js')
we({
    router: {
        // maps: require('/pages/util/map')
    }
})

if (!Function.prototype.bind) {
    Function.prototype.bind = function (context, ...args) {
        if (typeof this != 'function') {
            throw new Error('invalid function use bind')
        }
        return (...a) => {
            return this.apply(context, [...args, ...a])
        }
    }
}

new class extends we.App {
    onLaunch() {
        this.$checkSession().then(data=> {

        }).catch(err=> {
            console.warn("checkSession fail")
            wx.login({
                success: function (res) {
                    if (res.code) {
                        wx.setStorageSync("__sessionCode__", res.code)
                    } else {
                        this.$showModal({
                            title: '提示',
                            content: '获取用户登录态失败！' + res.errMsg,
                            showCancel: false
                        })
                    }
                }
            })
        })
    }
}