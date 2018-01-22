let we = require('../../../../we/index.js')
let wxValidate = require('../../../../utils/wxValidate.js')

new class extends we.Page {
    data() {
        return {
            po: {
                parentId: '', //父级Id
                code: '', //组织机构编码
                name: '', //组织机构名称
                legalName: '', //组织机构法人信息
                phoneNumber: '', //组织机构联系人电话号码
                registerAddress: '' //注册地址
            },
            vo: {
                session: '',
                parentName: ''
            }
        }
    }

    onLoad(option) {
        this.$getSession().then(sid=> {
            this.setData({
                'po.parentId': option.id,
                'vo.session': sid,
                'vo.parentName': option.name,
            })
        })

        this.formValidate = new wxValidate({
            code: {
                required: {
                    value: true,
                    message: '请填写组织机构编码'
                }
            },
            name: {
                required: {
                    value: true,
                    message: '请填写组织机构名称'
                }
            },
            legalName: {
                required: {
                    value: true,
                    message: '请填写组织机构法人信息'
                }
            },
            phoneNumber: {
                required: {
                    value: true,
                    message: '请填写组织机构联系人电话号码'
                }
            },
            registerAddress: {
                required: {
                    value: true,
                    message: '请填写地址'
                }
            }
        })
    }

    syncCode(e) {
        this.setData({
            'po.code': e.detail.value
        })
    }

    syncName(e) {
        this.setData({
            'po.name': e.detail.value
        })
    }

    syncLegal(e) {
        this.setData({
            'po.legalName': e.detail.value
        })
    }

    syncPhone(e) {
        this.setData({
            'po.phoneNumber': e.detail.value
        })
    }

    syncAddress(e) {
        this.setData({
            'po.registerAddress': e.detail.value
        })
    }

    toSave() {
        let err = this.formValidate.checkData(this.data.po)
        if (err) {
            return this.$showModal({
                title: '提示',
                content: err.message,
                showCancel: false
            })
        }

        this.$post('/organization/saveOrganizationInfo.do', Object.assign({}, {
            "session": this.data.vo.session
        }, this.data.po)).then(data=> {
            this.$navigateBack()
        }).catch(err=> {
            this.$showModal({
                title: '错误',
                content: err.message,
                showCancel: false
            })
        })
    }


}