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
                session: ''
            }
        }
    }

    onLoad(option) {
        this.setData({
            'po.mobile': option.mobile,
            'po.busiNo': option.busiNo
        })
    }

    onReady() {
        this.$getSession().then(data=> {
            this.setData({
                'vo.session': data
            })
            this.sendSms()
        })
    }
    sendSms(){
        this.$post('/reg/fetchValidSms.do', {
            "session": this.data.vo.session,
            "version": "0.0.1",
            "firstVal": this.data.po.mobile
        }).then(data=> {

        }).catch(err=>{
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
            this.$post('/reg/regUser.do', {
                "version": "0.0.1",
                "session": this.data.vo.session,
                "firstVal": this.data.po.mobile,
                "validSms": this.data.po.code,
                "busiNo":  this.data.po.busiNo,
                "passwd": this.data.po.pwd
            }).then(data=> {
                this.$navigateTo({
                    url: '/pages/cmem/reg/reg3/index',
                })
            }).catch(err=>{
                this.$showModal({
                    title: '错误',
                    content: err.message,
                    showCancel: false
                })
            })


        }
    }
}
