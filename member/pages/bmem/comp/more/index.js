let we = require('../../../../we/index.js')
let wxValidate = require('../../../../utils/wxValidate.js')

new class extends we.Page {
    data() {
        return {
            po: {
                "id": 1, //公司Id
                "name": '', //公司名称
                "subName": '', //简称,
                "logoUrl": '', //公司logo
                "unifyCode": '', //公司统一编号
                "legalName": '', //法人
                "phoneNumber": '', //公司联系电话
                "corporationNature": '', //企业性质,
                "industry": '', //行业类型,
                "instrumentImg": '', //营业执照 ,
                "permitImg": '', //食品许可证
                "code": null,   //公司编码
                "level": '', //公司权益级别
                "status": '', // 公司状态
                "description": '', // 公司描述
                "carouselOne": '', //公司轮播图-
                "carouselTwo": '', //公司轮播图二
                "carouselThree": '', //公司轮播图三
                "carouselFour": '', //公司轮播图四
                "carouselFive": '', //公司轮播图五
            },
            vo: {
                session: '',
                industryText: '请选择',
                corporationNatureIndex: 0,//企业性质索引
                corporationNatureList: [{
                    "value": "",
                    "name": '请选择'
                }]
            }
        }
    }

    onReady(options) {
        this.setData({
            'po': wx.getStorageSync('compInfo')
        })
        this.$getSession().then(sid=> {
            this.$post("/compAttr/findCompCorpNature.do", {"version": "0.0.1", "session": sid}).then(data=> {
                data.obj.unshift({
                    "value": "",
                    "name": "请选择"
                })
                let index = 0
                for (let i = 0; i < data.obj.length; i++) {
                    if (data.obj[i].value == this.data.po.corporationNature) {
                        index = i
                        break
                    }
                }
                this.setData({
                    'vo.session': sid,
                    'vo.corporationNatureIndex': index,
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
                'po.industry': this.data.selectData.code,
                'vo.industryText': this.data.selectData.name,
                'selectData': null
            })
        }
    }


    sync(e) {
        let filed = `po.${e.target.dataset.key}`
        this.setData({
            [filed]: e.detail.value
        })
    }

    bindPickerChange(e) {
        this.setData({
            'vo.corporationNatureIndex': e.detail.value,
            'po.corporationNature': this.data.vo.corporationNatureList[e.detail.value].value
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

    toCard() {
        this.$navigateTo("/pages/bmem/comp/moreCard/index")
    }


}