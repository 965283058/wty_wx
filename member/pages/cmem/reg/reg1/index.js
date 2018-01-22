let we = require('../../../../we/index.js')

new class extends we.Page {
    data() {
        return {
            po: {
                mobile: '',
                code: ''
            },
            vo: {
                checked: false,
                codeUrl: '',
                session: '',
                pageMode: '',//invited 受邀请注册
                employeeId:'',
                compInfo: {}
            }
        }
    }

    onLoad(options) {
        this.$getSession().then(sid=> {
            this.setData({
                'vo.session': sid,
                'vo.codeUrl': `https://api.ionelink.com/wt-gate/reg/fetchPicValidateUrl.do?session=${sid}&t=${Date.now()}`
            })
            let employeeId = options.employeeId
            if (employeeId) {
                this.$post('/employee/inviteEmployeeInfo.do', {
                    "version": "0.0.1",
                    "session": sid,
                    "firstVal": employeeId
                }).then(data=> {
                    wx.setStorageSync('invitedCompInfo',data.obj)
                    this.setData({
                        'vo.compInfo': data.obj,
                        'vo.pageMode': 'invited',
                        'vo.employeeId': employeeId,
                        'po.mobile':data.obj.phoneNumber
                    })
                }).catch(err=>{
                    this.$showModal({
                        title: '错误',
                        content: err.message,
                        showCancel: false
                    })
                })
            }

        })
    }

    updateImg() {
        this.setData({
            'vo.codeUrl': ''
        })
        setTimeout(()=> {
            this.setData({
                'vo.codeUrl': `https://api.ionelink.com/wt-gate/reg/fetchPicValidateUrl.do?session=${this.data.vo.session}&t=${Date.now()}`
            })
        }, 100)
    }

    mobileSync(e) {
        this.setData({
            'po.mobile': e.detail.value
        })
    }

    codeSync(e) {
        this.setData({
            'po.code': e.detail.value
        })
    }

    checkboxSync(e) {
        this.setData({
            'vo.checked': !this.data.vo.checked
        })

    }

    valid() {
        if (!this.data.po.mobile.trim()) {
            this.$showModal({
                title: '提示',
                content: "请输入手机号",
                showCancel: false
            })
            return false
        }

        if (!/^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$/.test(this.data.po.mobile)) {
            this.$showModal({
                title: '提示',
                content: "手机号输入错误",
                showCancel: false
            })
            return false
        }
        if (!this.data.po.code.trim()) {
            this.$showModal({
                title: '提示',
                content: "请输入验证码",
                showCancel: false
            })
            return false
        }

        if (!this.data.vo.checked) {
            this.$showModal({
                title: '提示',
                content: "请同意注册协议",
                showCancel: false
            })
            return false
        }
        return true
    }

    toValidPicCode() {
        if (this.valid()) {
            this.$post('/reg/checkMobileUnExist.do', {//AJAX判断验证码是否正确
                "session": this.data.vo.session,
                "version": "0.0.1",
                "firstVal": this.data.po.mobile,
                "secondVal": this.data.po.code
            }).then(data=> {
                this.$navigateTo({
                    //跳转到第二步
                    url: `/pages/cmem/reg/reg2/index?mobile=${this.data.po.mobile}&mode=${this.data.vo.pageMode}&employeeId=${this.data.vo.employeeId}`,
                })
            }).catch(err=> {
                this.$showModal({
                    title: '错误',
                    content: err.message,
                    showCancel: false
                })
                this.updateImg()
            })
        }
    }
}
