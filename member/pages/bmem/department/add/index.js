let we = require('../../../../we/index.js')
new class extends we.Page {
    data() {
        return {
            po: {
                "name": "",
                "companyId": '',
                "parentId": 1
            },
            vo: {
                parentName: ''
            }
        }
    }

    onLoad(option) {
        this.setData({
            'po.companyId': wx.getStorageSync('compInfo').id,
            'po.parentId': option.id,
            'vo.parentName': option.name
        })
    }

    syncName(e) {
        this.setData({
            'po.name': e.detail.value
        })
    }

    saveRtn() {
        if (!this.data.po.name.trim()) {
            return this.$showModal({
                title: '提示',
                content: '请输入部门名称',
                showCancel: false
            })
        }
        this.$getSession().then(sid=> {
            this.$post('/department/saveDepartmentInfo.do', Object.assign({}, {"session": sid}, this.data.po)).then(data=> {
                this.$navigateBack()
            }).catch(err=> {
                this.$showModal({
                    title: '错误',
                    content: err.message,
                    showCancel: false
                })
            })
        })

    }

}