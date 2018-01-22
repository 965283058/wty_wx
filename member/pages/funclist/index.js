let we = require('../../we/index.js')

new class extends we.Page {
    data() {
        return {
            po: {},
            vo: {
                target: '',//要跳转的目标页面
                session: ''
            }
        }
    }

    onLoad(option) {
        if (option.target) {
            this.setData({
                "vo.target": decodeURIComponent(option.target)
            })
            console.warn("===============要跳转的页面==========", decodeURIComponent(option.target), '==========end==========')
        }
        this.login()
    }

    updateEnums() {
        let enums = wx.getStorageSync("__allEnums__")//获取本地Session存储的所有枚举

        this.$post('/compAttr/findCompAllEnums.do', {
            session: this.data.vo.session
        }).then(data=> {
            wx.setStorageSync("__allEnums__", data.obj)//获取本地Session存储的所有枚举
        }).catch(err=> {
            if (enums) {
                this.$showModal({
                    title: '提示',
                    content: `更新枚举失败${err.message}`,
                    showCancel: false
                })
            } else {
                this.$showModal({
                    title: '提示',
                    content: `获取枚举失败，请重启小程序${err.message}`,
                    showCancel: false
                })
            }
        })


    }

    login() {
        let self = this;
        wx.login({
            success: function (res) {
                if (res.code) {
                    wx.setStorageSync("__sessionCode__", res.code)
                    self.initData(res.code)
                } else {
                    this.$showModal({
                        title: '提示',
                        content: '获取用户登录态失败！' + res.errMsg,
                        showCancel: false
                    })
                }
            }
        })
    } //调用微信登录接口

    initData(code) {//获取用户状态信息
        this.$getSession().then(sid=> {
            this.setData({
                "vo.session": sid
            })
            this.updateEnums();
            if (this.data.vo.target) {
                this.postUserInfo(this.data.vo.target)
            } else {
                this.$post('/wechatFans/fetchWXInfo.do', {
                    "secondVal": "miniapp_member",
                    "firstVal": code,
                    "session": this.data.vo.session
                }).then(data=> {
                    switch (data.stringVal) {
                        case "101"://101未上传粉丝信息 完成后进入用户注册
                            this.postUserInfo('/pages/cmem/reg/reg1/index')
                            break
                        case "102"://未注册用户
                            wx.reLaunch({url: '/pages/cmem/reg/reg1/index'})
                            break
                        case "103"://进入工作台
                            wx.reLaunch({url: '/pages/bmem/workbench/index'})
                            break
                        case "104"://粉丝已关联用户并没有公司信息 进入工作台
                            wx.reLaunch({url: '/pages/bmem/workbench/index?noComp=true'})
                            break
                        case "105"://104服务器要求更新用户信息 完成后进入工作台
                            this.postUserInfo('/pages/bmem/workbench/index')
                            break
                        default:
                            this.$showModal({
                                title: '提示',
                                content: '未知状态',
                                showCancel: false
                            })
                            break;
                    }
                })
            }
        }).catch(err=> {
            this.$showModal({
                title: '提示',
                content: err.message,
                showCancel: false
            })
        })
    }


    postUserInfo(redirectURL) {//插入用户数据
        this.$getUserInfo({
            withCredentials: true,
            lang: 'zh_CN'
        }).then(data=> {
            this.$post("/wechatFans/insertWechatFansInfo.do", {
                "session": this.data.vo.session,
                "name": data.userInfo.nickName,
                "sex": data.userInfo.gender,//性别
                "city": data.userInfo.city,//所在城市
                "province": data.userInfo.province,//所在省份
                "country": data.userInfo.country,//所在国家
                "imgUrl": data.userInfo.avatarUrl,
                "encryptedData": data.encryptedData,
                "iv": data.iv
            }).then(data=> {
                wx.reLaunch({url: redirectURL})
            }).catch(err=> {
                this.$showModal({
                    title: '提示',
                    content: "获取session失败",
                    showCancel: false
                })
            })
        })
    }
}
