let we = require('../../../../we/index.js')
new class extends we.Page {
    data() {
        return {
            po: {
                value: {}
            },
            vo: {
                list: []
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
        if (this.data.po.value&&this.data.po.value.code) {
            let pages = getCurrentPages()
            let prevPage = pages[pages.length - 2];  //上一个页面
            prevPage.setData({
                selectData: this.data.po.value
            })
            wx.navigateBack()
        } else {
            this.$showModal({
                title: '提示',
                content: "您未选择，是否返回？"
            }).then(data=> {
                if (data.confirm) {
                    wx.navigateBack(null)
                }
            })
        }


    }

}