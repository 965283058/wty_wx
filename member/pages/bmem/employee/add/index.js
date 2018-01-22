let we = require('../../../../we/index.js')
let wxValidate = require('../../../../utils/wxValidate.js')
new class extends we.Page {


    data() {
        return {
            po: {
                "id": '',
                "version": "0.0.1",
                "session": "",
                "name": "",
                "phoneNumber": "",
                "email": "",
                "companyId": wx.getStorageSync('compInfo').id,
                "departmentId": "",
                "post": ""
            },
            vo: {
                status: '待输入',
                postName: '请选择',
                PositionList: wx.getStorageSync("PositionList"),
                OrganizationName: wx.getStorageSync('compInfo').name,
                deptName: '请选择',

                pageMode: 'add',
                btnDisabled: false
                // OrganizationIndex: [0, 0, 0],
                // OrganizationList: [[{name: '请选择', id: ''}], [], []],
                // OrganizationName: '请选择'
            }
        }
    }

    onReady() {
        this.formValidate = new wxValidate({
            name: {
                required: {
                    value: true,
                    message: '请填写员工名称'
                },
                minlength: {
                    value: 2,
                    message: '员工名称长度必须大于2'
                },
                maxlength: {
                    value: 10,
                    message: '员工名称长度不能大于10'
                },
            },
            phoneNumber: {
                required: {
                    value: true,
                    message: '请填写手机号码'
                },
                tel: {
                    value: true,
                    message: '手机号码格式错误'
                },
            },
            email: {
                required: {
                    value: true,
                    message: '请填写邮箱'
                },
                email: {
                    value: true,
                    message: '邮箱格式错误'
                },
            },

            /* companyId: {
             required: {
             value: true,
             message: '请选择组织机构'
             }
             },*/
            departmentId: {
                required: {
                    value: true,
                    message: '请选择部门'
                }
            },
            post: {
                required: {
                    value: true,
                    message: '请选择岗位'
                }
            },
        })
    }

    onLoad(option) {
        this.$getSession().then(sid=> {
            this.setData({
                'po.id': option.id || '',
                'po.session': sid
            })
            if (option.id) {
                this.setData({
                    'vo.pageMode': 'edit'
                })
                wx.setNavigationBarTitle({
                    title: '编辑员工'
                })
                this.loadInfo()
            }
        })
    }

    onShow() {
        if (this.data.selectData) {
            this.setData({
                'po.departmentId': this.data.selectData.id,
                'vo.deptName': this.data.selectData.name,
                'selectData': null
            })
        }
    }


    loadInfo() {
        this.$post('/employee/fetchEmployeeInfo.do', {
            "session": this.data.po.session,
            "firstVal": this.data.po.id
        }).then(data=> {
            this.setData({
                'po': {
                    "id": data.obj.id,
                    "version": "0.0.1",
                    "session": this.data.po.session,
                    "name": data.obj.name,
                    "phoneNumber": data.obj.phoneNumber,
                    "email": data.obj.email,
                    "departmentId": data.obj.departmentId,
                    "post": data.obj.post,
                    "companyId": data.obj.companyId,
                },
                'vo.status': this.$getEnumName('WT_ACT_STATUS', data.obj.workStatus),
                'vo.deptName': data.obj.departmentName
            })
            for (let i = 0; i < this.data.vo.PositionList.length; i++) {
                if (this.data.vo.PositionList[i].role == data.obj.post) {
                    this.setData({
                        'vo.PositionIndex': i
                    })
                    break
                }
            }
        }).catch(err=> {
            this.$showModal({
                title: '错误',
                content: err.message,
                showCancel: false
            })
        })
    }

    checkMoblie() {
        if (this.data.vo.pageMode == 'add') {
            if (/^1\d{10}$/.test(this.data.po.phoneNumber)) {
                this.$post('/employee/employeeIsOrNotActive.do', {
                    "firstVal": this.data.po.phoneNumber,
                    "session": this.data.po.session
                }).then(data=> {
                    this.setData({
                        'vo.status': data.stringVal,
                        'vo.btnDisabled': data.obj.code != 0
                    })
                }).catch(err=> {
                    this.$showModal({
                        title: '错误',
                        content: err.message,
                        showCancel: false
                    })
                })
            } else {
                this.setData({
                    'vo.btnDisabled': false
                })
            }
        }
    }

    syncName(e) {
        this.setData({
            'po.name': e.detail.value
        })
    }

    syncPhone(e) {
        this.setData({
            'po.phoneNumber': e.detail.value
        })
    }

    syncEmail(e) {
        this.setData({
            'po.email': e.detail.value
        })
    }

    /*
     organizationPickerChange(e) {
     let value = e.detail.value, id = '', name = ''
     for (let i = 0; i < value.length; i++) {
     let temp = this.data.vo.OrganizationList[i][value[i]]
     if (temp) {
     id = temp.id
     name += `-${temp.name}`
     }
     }
     this.setData({
     'vo.OrganizationIndex': value,
     'vo.OrganizationName': name.substring(1),
     'po.companyId': id,
     })
     }

     organizationPickerColChange(e) {
     if (e.detail.column < 2) {
     //  console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
     let currCol = this.data.vo.OrganizationList[e.detail.column] //当前改变的列
     if (currCol) {
     let temp = currCol[e.detail.value].compList
     if (temp) {
     this.data.vo.OrganizationList[e.detail.column + 1] = temp
     this.setData({
     'vo.OrganizationList': this.data.vo.OrganizationList
     })
     this.organizationPickerColChange({
     detail: {
     column: e.detail.column + 1,
     value: 0
     }
     })
     } else {
     this.data.vo.OrganizationList[1] = []
     this.data.vo.OrganizationList[2] = []
     this.setData({
     'vo.OrganizationList': this.data.vo.OrganizationList
     })
     }
     }
     }
     }*/

    positionPickerChange(e) {
        let role = e.detail.map(item=> {
            return item.role
        }).join(',')
        let name = e.detail.map(item=> {
            return item.name
        }).join('|')
        this.setData({
            'po.post': role,
            'vo.postName': name || '请选择'
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
        //AJAX保存公司信息
        //跳转保存成功页面


        this.$post('/employee/saveEmployeeInfo.do', this.data.po).then(data=> {
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