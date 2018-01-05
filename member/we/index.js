let Pages = require('./pages.js')
let utils = require('./utils.js')
let request = require('./request.js')
let navigateTo = require('./navigateTo.js')
let redirectTo = require('./redirectTo.js')
let Application = require('./application.js')

let config = {
    http: {
        root: 'https://cloud.openbang.net/wt-gate',
        header: {},
        duration: 1,
        timestamp: false,
        error: (message) => we.showModal({content: '', title: message})
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
    Pages.prototype.$uploadFile = http('GET')


    Pages.prototype.$getSession = ()=> {
        return new Promise((rev, rej)=> {
            let sessionData = wx.getStorageSync("__session__")
            if (sessionData && sessionData.endDate && sessionData.endDate > Date.now()) {
                rev(sessionData.session)
            } else {
                http('POST')('/reg/fetchSession.do', {
                    "appId": "wtyun_wxapp",
                    "md5": "NIU99JKDS86TY65",
                    "version": "0.0.1",
                    "osType": "iOS",
                    "osVer": "11.1.2"
                }).then(res=> {
                    let data = res.obj
                    data.endDate = Date.parse(data.endDate.substr(0, 4) + '-' + data.endDate.substr(4, 2) + '-' + data.endDate.substr(6))
                    wx.setStorageSync("__session__", data)
                    rev(data.session)
                }).catch(err=> {
                    wx.showModal({
                        title: "建立Session出错",
                        content: err.message
                    })
                })
            }

        })
    }
    /*
     Pages.prototype.$toBase64 = (file)=> {
     console.info(typeof file)
     return new Promise((rev, rej)=> {
     var reader = new FileReader()
     reader.onload = function (e) {
     var arrayBuffer = reader.result;
     //  var base64 = wx.arrayBufferToBase64(arrayBuffer)
     rev(arrayBuffer)
     }
     reader.onerror = function (e) {
     rej(e)
     }
     reader.readAsDataURL(file)
     })
     }*/
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

let http = (method = 'GET') => {
    return (url, data = {}, header = {}) => {
        return we.request({
            url: url,
            header,
            method,
            data: data
        }).then(res => {
            if (res.data.code === 0) {
                return Promise.resolve(res.data)
            } else {
                return Promise.reject({message: res.data.msg})
            }
        }, err=> {
            return Promise.reject({message: err.msg})
        })
    }
}