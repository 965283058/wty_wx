let we = require('../../../../we/index.js')
new class extends we.Page {


    data() {
        return {
            po: {
                "id": ''
            },
            vo: {
                session: '',
                name: '',
                code: '', //0 表示是否要发送站内消息    1 表示是否要分享链接
                pageMode: ''  //0 员工  1供货商  2客户
            },
            shareObject: {
                title: '员工邀请',
                path: 'pages/cmem/regInvited/open/index'
            }
        }
    }

    onLoad(option) {
        this.$getSession().then(sid=> {
            let shareObject;
            if (option.mode == 0) {
                let target = encodeURIComponent(`/pages/cmem/regInvited/open/index?id=${option.id}`)
                shareObject = {
                    title: '员工邀请',
                    path: `/pages/funclist/index?target=${target}`
                }
            }
            this.setData({
                'po.id': option.id || '',
                'vo.pageMode': option.mode,
                'vo.session': sid,
                'shareObject': shareObject
            })
            this.loadInfo()
        })
    }

    onShareAppMessage(options) {
        return this.data.shareObject
    }


    loadInfo() {
        this.$post('/employee/inviteEmployee.do', {
            "version": "0.0.1",
            "session": this.data.vo.session,
            "firstVal": this.data.po.id
        }).then(data=> {
            this.setData({
                'vo.name': data.obj.name,
                'vo.code': data.obj.code
            })
            wx.setNavigationBarTitle({
                title: '邀请员工'
            })
        }).catch(err=> {
            this.$showModal({
                title: '错误',
                content: err.message,
                showCancel: false
            })
        })
    }
}