let we = require('../../../../we/index.js')
let wxValidate = require('../../../../utils/wxValidate.js')

new class extends we.Page {
    data() {
        return {
            po: {
                unifyCode: '',//统一编号
                name: '',//名称
                subName: '',// 简称
                corporationNature: '',//企业性质索引
                industry: '',//行业类型
                instrumentImg: '',//营业执照,
                permitImg: '',//食品许可证,
                //  userId: ''//用户id
            },
            vo: {
                session: '',
                industryText: '请选择',
                corporationNatureIndex: 0,//企业性质索引
                corporationNatureList: [{
                    "id": "",
                    "name": '请选择'
                }]
            }
        }
    }

    onReady(options) {

        this.$getSession().then(sid=> {
            this.$post("/compAttr/findCompCorpNature.do", {"version": "0.0.1", "session": sid}).then(data=> {
                data.obj.unshift({
                    "id": "",
                    "name": "请选择"
                })
                this.setData({
                    'vo.session': sid,
                    'vo.corporationNatureList': data.obj
                })
            })
            this.$post("/compAttr/findCompCorpNature.do")
        })
        this.formValidate = new wxValidate({
            unifyCode: {
                required: {
                    value: true,
                    message: '请填写统一编号'
                }
            },
            name: {
                required: {
                    value: true,
                    message: '请填写公司名称'
                },
                minlength: {
                    value: 2,
                    message: '公司名称长度必须大于2'
                },
                maxlength: {
                    value: 20,
                    message: '公司名称长度不能大于20'
                },
            },
            subName: {
                required: {
                    value: true,
                    message: '请填写公司简称'
                }
            },
            corporationNature: {
                required: {
                    value: true,
                    message: '请选择公司性质'
                }
            },
            industry: {
                required: {
                    value: true,
                    message: '请选择行业类型'
                }
            },
            instrumentImg: {
                required: {
                    value: true,
                    message: '请上传营业执照'
                }
            },
            permitImg: {
                required: {
                    value: true,
                    message: '请上传食品经营许可证'
                }
            },
        })

    }

    onShow(options) {
        if (this.data.selectData) {
            this.setData({
                'po.industry': this.data.selectData.code,
                'vo.industryText': this.data.selectData.name,
                'selectData': null
            })
        }
    }

    checkUnifyCode() {
        if (this.data.po.unifyCode) {
            this.$post("/company/checkCompUnifyCode.do", {
                "version": "0.0.1",
                "session": this.data.vo.session,
                "firstVal":this.data.po.unifyCode
            }).then(data=> {
            }).catch(err=> {
                this.$showModal({
                    title: '提示',
                    content: "公司统一编号已占用",
                    showCancel: false
                })
            })
        }

    }


    syncCode(e) {
        this.setData({
            'po.unifyCode': e.detail.value
        })
    }

    syncName(e) {
        this.setData({
            'po.name': e.detail.value
        })
    }

    syncSubName(e) {
        this.setData({
            'po.subName': e.detail.value
        })
    }

    selectInstrumentImg() {
        this.$chooseImage({
            count: 1,
        }).then(data=> {
            this.setData({
                'po.instrumentImg': data.tempFilePaths[0]
            })
        })
    }

    selectPermitImg() {
        this.$chooseImage({
            count: 1,
        }).then(data=> {
            this.setData({
                'po.permitImg': data.tempFilePaths[0]
            })
        })
    }

    bindPickerChange(e) {
        this.setData({
            'vo.corporationNatureIndex': e.detail.value,
            'po.corporationNature': this.data.vo.corporationNatureList[e.detail.value].value
        })
    }

    toCompIndustrySelect() {
        this.$navigateTo("/pages/bmem/comp/compIndustrySelect/index")
    }


    formSubmit() {
        let err = this.formValidate.checkData(this.data.po)

        if (err) {
            return this.$showModal({
                title: '提示',
                content: err.message,
                showCancel: false
            })
        }
        Promise.all([
            this.$post("/company/saveImg.do", {
                "data": {"session": this.data.vo.session},
                uploadFile: {'imgfile': this.data.po.instrumentImg}
            }),
            this.$post("/company/saveImg.do", {
                "data": {"session": this.data.vo.session},
                uploadFile: {'imgfile': this.data.po.permitImg}
            })
        ]).then((values)=> {
            this.setData({
                'po.instrumentImg': values[0].stringVal,
                'po.permitImg': values[1].stringVal
            })
            //AJAX保存公司信息
            this.$post("/company/regComp.do", Object.assign({}, {
                "version": "0.0.1",
                "session": this.data.vo.session,
            }, this.data.po)).then(data=> {
                wx.reLaunch({url: `/pages/bmem/comp/regSucc/index?name=${this.data.po.name}`})//跳转保存成功页面
            }).catch(err=> {
                this.$showModal({
                    title: '错误',
                    content: err.message,
                    showCancel: false
                })
            })
        }, errs=> {
            this.$showModal({
                title: '错误',
                content: '上传图片错误：' + errs.message,
                showCancel: false
            })
        })
    }

    bank() {
        wx.navigateBack()
    }


}