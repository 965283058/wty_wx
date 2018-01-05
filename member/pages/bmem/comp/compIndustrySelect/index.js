let we = require('../../../../we/index.js')
new class extends we.Page {
    data() {
        return {
            po: {
                value: {}
            },
            vo: {
                list: [{
                    "code": "C",
                    "children": [{
                        "id": "397803918618263552",
                        "name": "农副食品加工业",
                        "code": "13",
                        "parentId": "397797797958516736",
                        "parentName": "制造业",
                        "parentCode": "C",
                        "status": "Y"
                    }, {
                        "id": "397808542402215936",
                        "name": "食品制造业",
                        "code": "14",
                        "parentId": "397797797958516736",
                        "parentName": "制造业",
                        "parentCode": "C",
                        "status": "Y"
                    }, {
                        "id": "397809017818185728",
                        "name": "酒、饮料和精致茶制造业",
                        "code": "15",
                        "parentId": "397797797958516736",
                        "parentName": "制造业",
                        "parentCode": "C",
                        "status": "Y"
                    }],
                    "name": "制造业",
                    "id": "397797797958516736"
                }, {
                    "code": "F",
                    "children": [{
                        "id": "397809222470860800",
                        "name": "批发业",
                        "code": "51",
                        "parentId": "397809121111310336",
                        "parentName": "批发和零售",
                        "parentCode": "F",
                        "status": "Y"
                    }, {
                        "id": "397809304238817280",
                        "name": "零售业",
                        "code": "52",
                        "parentId": "397809121111310336",
                        "parentName": "批发和零售",
                        "parentCode": "F",
                        "status": "Y"
                    }],
                    "name": "批发和零售",
                    "id": "397809121111310336"
                }, {
                    "code": "H",
                    "children": [{
                        "id": "397809457607737344",
                        "name": "住宿业",
                        "code": "61",
                        "parentId": "397809379950198784",
                        "parentName": "住宿和餐饮",
                        "parentCode": "H",
                        "status": "Y"
                    }, {
                        "id": "397809535365939200",
                        "name": "餐饮业",
                        "code": "62",
                        "parentId": "397809379950198784",
                        "parentName": "住宿和餐饮",
                        "parentCode": "H",
                        "status": "Y"
                    }],
                    "name": "住宿和餐饮",
                    "id": "397809379950198784"
                }]
            }
        }
    }

    onReady() {
        this.$getSession().then(sid=> {
            this.$post("/compAttr/findCompIndustry.do", {"version": "0.0.1", "session": sid}).then(data=> {
                this.setData({
                    'vo.list': data.obj
                })
            })
        })
    }

    select(e) {
        this.setData({
            'po.value': e.target.dataset.info
        })
    }

    reset() {
        this.setData({
            'po.value': {}
        })
    }

    sure() {
        if (!this.data.po.value) {
            this.$showModal({
                title: '提示',
                content: "您未选择，是否返回？"
            }).then(data=> {
                if (data.confirm) {
                    wx.navigateBack(null)
                }
            })
        } else {
            let pages = getCurrentPages()
            let prevPage = pages[pages.length - 2];  //上一个页面
            prevPage.setData({
                selectData: this.data.po.value
            })
            wx.navigateBack()
        }


    }

}