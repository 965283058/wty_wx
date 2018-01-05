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
        wx.login({
            success: function (res) {
                if (res.code) {
                    console.warn("code:"+res.code)
                } else {
                    console.log('获取用户登录态失败！' + res.errMsg)
                }
            }
        })

        wx.checkSession({
            success: function () {
                console.info("success")
            },
            fail: function () {

            }
        })
    }
}