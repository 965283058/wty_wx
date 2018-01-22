let we = require('../../../../we/index.js')

new class extends we.Page {
    data() {
        return {
            po: {
                checked: false,
                session: '',
                id: '',
            },
            vo: {}
        }
    }

    onLoad(options) {
        if (options.id) {
            this.$getSession().then(sid=> {
                this.setData({
                    'po.session': sid,
                    'po.id': options.id
                })
                this.$post('/employee/fetchInviteEmployeeData.do', {
                    "version": "0.0.1",
                    "session": sid,
                    "firstVal": options.id
                }).then(data=> {
                    this.setData({
                        'vo': data.obj
                    })
                }).catch(err=> {
                    this.$showModal({
                        title: '错误',
                        content: err.message,
                        showCancel: false
                    })
                })
            })
        } else {
            this.$showModal({
                title: '提示',
                content: "错误的邀请,未发现您的ID",
                showCancel: false
            })
        }

    }

    checkboxSync() {
        this.setData({
            'po.checked': !this.data.po.checked
        })
    }

    toWorkbench() {
        this.$post('/employee/joinCompany.do', {
            "version": "0.0.1",
            "session": this.data.po.session,
            "firstVal": this.data.po.id
        }).then(data=> {
            wx.reLaunch({url: '/pages/bmem/workbench/index'})
        }).catch(err=> {
            this.$showModal({
                title: '错误',
                content: err.message,
                showCancel: false
            })
        })
    }

    toReg() {
        if (!this.data.po.checked) {
            this.$showModal({
                title: '提示',
                content: "请同意注册协议",
                showCancel: false
            })
            return false
        }
        wx.navigateTo({
            url: `/pages/cmem/reg/reg1/index?employeeId=${this.data.po.id}`,
        })
    }
}


