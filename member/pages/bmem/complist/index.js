let we = require('../../../we/index.js')

new class extends we.Page {
    data() {
        return {
            vo: {
                sid: '',
                list: [],
                currComp: {}
            }
        }
    }

    onLoad(option) {
        let compInfo = wx.getStorageSync('compInfo')
        this.setData({
            "vo.currComp": compInfo
        })
    }

    onReady() {
        this.$getSession().then(sid=> {
            this.$post('/company/readUserAllComp.do', {
                session: sid
            }).then(data=> {
                data.obj.map(item=> {
                    item.statusText =this.$getEnumName('WT_AUTH_STATUS', item.status)
                    return item
                })
                this.setData({
                    "vo.sid": sid,
                    "vo.list": data.obj
                })
            })
        })
    }

    toReg() {
        this.$navigateTo("/pages/bmem/comp/reg/index")
    }

    switchComp(e) {
        let targetId = e.target.dataset.id
        if (targetId != this.data.vo.currComp.id) {
            this.$post('/company/switchComp.do', {
                session: this.data.vo.sid,
                firstVal: targetId
            }).then(data=> {
                this.$navigateBack();
            }).catch(err=> {
                wx.showModal({
                    title: "错误",
                    content: err.message
                })
            })
        } else {
            this.$navigateBack();
        }
    }

}
