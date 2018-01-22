let we = require('../../../../we/index.js')

new class extends we.Page {
    data() {
        return {
            po: {
                busiNo: '',
                mobile: '',
                code: '',
                pwd: '',
                pwdConfirm: '',
            },
            vo: {
                session: '',
                pageMode: '',//invited 受邀请注册
                compInfo: {},
                employeeId: ''
            }
        }
    }

    onLoad(option) {
        this.setData({
            'po.mobile': option.mobile
        })
        if (option.mode == 'invited') {  //如果是邀请
            this.setData({
                'vo.pageMode': option.mode,
                'vo.compInfo': wx.getStorageSync('invitedCompInfo'),
                'vo.employeeId': option.employeeId
            })
        }
    }

    onReady() {
        this.$getSession().then(data=> {
            this.setData({
                'vo.session': data
            })
            this.sendSms()
        })
    }

    sendSms() {
        this.$post('/reg/fetchValidSms.do', {
            "session": this.data.vo.session,
            "version": "0.0.1",
            "firstVal": this.data.po.mobile
        }).then(data=> {
            this.setData({
                'po.busiNo': data.stringVal.split(':')[0]
            })

            console.warn("==========短信验证码========", data, '========end========')

        }).catch(err=> {
            this.$showModal({
                title: '错误',
                content: err.message,
                showCancel: false
            })
        })
    }

    codeSync(e) {
        this.setData({
            'po.code': e.detail.value
        })
    }

    pwdSync(e) {
        this.setData({
            'po.pwd': e.detail.value
        })
    }

    pwdConfirmSync(e) {
        this.setData({
            'po.pwdConfirm': e.detail.value
        })
    }

    valid() {
        if (!this.data.po.code.trim()) {
            this.$showModal({
                title: '提示',
                content: "请输入短信验证码",
                showCancel: false
            })
            return false
        }
        if (!/^\S{4,6}$/.test(this.data.po.code)) {
            this.$showModal({
                title: '提示',
                content: "短信验证码格式错误",
                showCancel: false
            })
            return false
        }
        if (!this.data.po.pwd.trim()) {
            this.$showModal({
                title: '提示',
                content: "请输入密码",
                showCancel: false
            })
            return false
        }

        if (!/^\S{6,18}$/.test(this.data.po.pwd)) {
            this.$showModal({
                title: '提示',
                content: "密码格式错误(应为6-18位非空字符)",
                showCancel: false
            })
            return false
        }
        if (this.data.po.pwd !== this.data.po.pwdConfirm) {
            this.$showModal({
                title: '提示',
                content: "两次密码输入不一致",
                showCancel: false
            })
            return false
        }
        return true
    }

    next() {
        if (this.valid()) {
            if (this.data.vo.pageMode != 'invited') { //如果是普通注册
                this.$post('/reg/regUser.do', {
                    "version": "0.0.1",
                    "session": this.data.vo.session,
                    "mobile": this.data.po.mobile,
                    "validSms": this.data.po.code,
                    "busiNo": this.data.po.busiNo,
                    "passwd": this.data.po.pwd
                }).then(data=> {
                    wx.reLaunch({url: `/pages/cmem/reg/reg3/index?mobile=${this.data.po.mobile}`})
                }).catch(err=> {
                    this.$showModal({
                        title: '错误',
                        content: err.message,
                        showCancel: false
                    })
                })
            } else {
                this.$post('/user/regInvitedEmployee.do', {
                    "version": "0.0.1",
                    "session": this.data.vo.session,
                    "mobile": this.data.po.mobile,
                    "validSms": this.data.po.code,
                    "busiNo": this.data.po.busiNo,
                    "passwd": this.data.po.pwd,
                    "companyId": this.data.vo.compInfo.compId,
                    "employeeId": this.data.vo.employeeId
                }).then(data=> {
                    wx.removeStorageSync('invitedCompInfo')
                    wx.reLaunch({url: `/pages/cmem/regInvited/reg3/index?mobile=${this.data.po.mobile}`})
                }).catch(err=> {
                    this.$showModal({
                        title: '错误',
                        content: err.message,
                        showCancel: false
                    })
                })
            }
        }
    }
}
