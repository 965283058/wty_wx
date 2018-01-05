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

    onShow(object) {
        wx.setStorageSync("appShowData", object)
    }
}