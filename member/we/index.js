let Pages = require('./pages.js')
let utils = require('./utils.js')
let request = require('./request.js')
let navigateTo = require('./navigateTo.js')
let redirectTo = require('./redirectTo.js')
let Application = require('./application.js')

let config = {
    http: {
        root: 'https://api.ionelink.com/wt-gate',
        header: {},
        duration: 1,
        timestamp: false,
        error: (message) => {
            we.showModal({content: message, title: "网络错误", showCancel: true})
        }
    },
    router: {
        maps: {}
    }
}

function we(obj = {}) {
    we.request = request(Object.assign({}, config.http, obj.http))
    we.navigateTo = navigateTo(Object.assign({}, config.router, obj.router))
    we.redirectTo = redirectTo(Object.assign({}, config.router, obj.router))
    Pages.prototype.$post = http('POST')
    Pages.prototype.$get = http('GET')
    Pages.prototype.$getSession = getSession
    Pages.prototype.$getEnumName = function (enumName, enumValue) {
        let allEnums = wx.getStorageSync("__allEnums__")
        let name = null
        for (let enumItem of allEnums) {
            if (enumItem.type == enumName) {
                for (let item of enumItem.values) {
                    if (item.value == enumValue) {
                        name = item.name
                    }
                }
                break
            }
        }
        return name
    }

    Application.prototype.$post = http('POST')
    Application.prototype.$get = http('GET')
    Application.prototype.$getSession = getSession


}


utils.toPromise(we, wx)
we.request = request(config.http)
we.navigateTo = navigateTo(config.router)
we.redirectTo = redirectTo(config.router)


we.Page = Pages
we.App = Application

Pages.global = we
Application.global = we

module.exports = we

let getSession = ()=> {
    return new Promise((rev, rej)=> {
        let sessionData = wx.getStorageSync("__session__")
        if (sessionData) {// && sessionData.endDate && sessionData.endDate > Date.now()
            rev(sessionData)
        } else {
            wx.getSystemInfo({
                success: function (systemInfo) {
                    http('POST')('/session/fetchSession.do', {
                        "appId": "miniapp_member",
                        "md5": "NIU99JKDS86TY65",
                        "version": "0.0.1",
                        "osType": systemInfo.platform,
                        "osVer": "11.1.2",
                    }).then(res=> {
                        let data = res.stringVal
                        // data.endDate = Date.parse(data.endDate.substr(0, 4) + '-' + data.endDate.substr(4, 2) + '-' + data.endDate.substr(6))
                        wx.setStorageSync("__session__", data)
                        console.info("===========session=============", data, "========================")
                        rev(data)
                    }).catch(err=> {
                        wx.removeStorage({key: '__sessionCode__'})
                        wx.showModal({
                            title: "建立Session出错",
                            content: err.message,
                            showCancel: true
                        })
                    })
                }
            })
        }
    })
}

let http = (method = 'GET') => {
    return (url, data = {}, header = {}) => {
        return we.request({
            url: url,
            header,
            method,
            data: data,
            duration: 1,
        }).then(res => {
            if (typeof res.data == 'string') {
                res.data = JSON.parse(res.data)
            }
            if (res.data.code === 0) {
                return Promise.resolve(res.data)
            } else if (res.data.code === 2 || res.data.code === 3) {
                wx.removeStorage({key: '__session__'})
                wx.removeStorage({key: '__sessionCode__'})
                return Promise.reject({message: 'session失效,请重启小程序'})
            } else {
                return Promise.reject({message: res.data.msg})
            }
        }, err=> {
            return Promise.reject({message: err.msg})
        })
    }
}