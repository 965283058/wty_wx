let we = require('../../../../we/index.js')
let wxValidate = require('../../../../utils/wxValidate.js')

new class extends we.Page {
    data() {
        return {
            po: {
                unifyCode: '',//统一编号
                name: '',//名称
                subName: '',// 简称
                corporationNatureIndex: 0,//企业性质索引
                corporationNature: '',//企业性质索引
                industry: '',//行业类型
                instrumentImg: '',//营业执照,
                permitImg: '',//食品许可证,
                userId: ''//用户id
            },
            vo: {
                session: '',
                industryText: '请选择',
                corporationNatureList: [{
                    "id": "",
                    "name": "请选择"
                }]
            }
        }
    }

    onReady() {
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
                'po.industry': this.data.selectData.id,
                'vo.industryText': this.data.selectData.name,
                'selectData': null
            })
        }
    }

    checkUnifyCode() {
        this.$post("/company/checkCompUnifyCode.do", {
            "version": "0.0.1",
            "session": this.data.vo.session,
            "firstVal": this.data.po.unifyCode
        }).then(data=> {
        }).catch(err=> {
            this.$showModal({
                title: '提示',
                content: "公司统一编号已占用",
                showCancel: false
            })
        })

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
                'po.instrumentImg': data.tempFiles[0].path
            })
        })
    }

    selectPermitImg() {
        this.$chooseImage({
            count: 1,
        }).then(data=> {
            this.setData({
                'po.permitImg': data.tempFiles[0].path
            })
        })
    }

    bindPickerChange(e) {
        this.setData({
            'po.corporationNatureIndex': e.detail.value,
            'po.corporationNature': this.data.vo.corporationNatureList[e.detail.value].id
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

        //AJAX保存公司信息
        this.$post("/company/regComp.do", Object.assign({}, {
            "version": "0.0.1",
            "session": this.data.vo.session,
        }, this.data.po)).then(data=> {
            this.$navigateTo("/pages/bmem/comp/regSucc/index")//跳转保存成功页面
        })
    }


}