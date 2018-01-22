let we = require('../../../../we/index.js')
// let urls = require('../util/map.js')
// let apis = require('../apis/user')
// let toast = require('../../weui/toast/index')
// let mix = require('../util/mix')

new class extends we.Page {
    data() {
        return {
            po: {
                pageNo: 1,
                pageSize: 10,
                firstVal: '',//公司ID
            },
            vo: {
                session: '',
                compName: '',
                scrollViewHeight: 300,
                list: [],
                total: 0,
                Position:[] ,
                loadUrl: '/employee/fetchAllEmployeeInfo.do',//直接进入员工列表加载的接口地址
            }
        }
    }

    onLoad(option) {
        let compInfo = wx.getStorageSync("compInfo")
        let Position= wx.getStorageSync("PositionList")
        this.setData({
            'vo.compName': compInfo.name,
            'vo.Position': compInfo.Position,
        })
        if (option.compId) {//如果是从组织机构过来
            this.setData({
                'vo.loadUrl': '/employee/fetchAllOrgaEmployeeInfo.do',
                'po.firstVal': option.compId
            })
        }
    }

    onReady() {
        this.$getSystemInfo().then((info)=> {
            this.setData({
                'vo.scrollViewHeight': info.windowHeight - 240
            })
        })
        this.$getSession().then(sid=> {
            this.setData({
                'vo.session': sid
            })
            this.loadData()
        })
    }

    onShow() { //从其他页面返回
        if (this.data.vo.session) {
            this.setData({
                'po.pageNo': 1,
                'vo.list': []
            })
            this.loadData()
        }
    }

    onPullDownRefresh() {  //下拉刷新
        this.setData({
            'po.pageNo': 1,
            'vo.list': []
        })
        this.loadData().then(()=> {
            wx.stopPullDownRefresh()
        })

    }

    loadMore() {   //上拉加载更多
        if ((this.data.po.pageNo * this.data.po.pageSize) < this.data.vo.total) {
            this.setData({
                'po.pageNo': this.data.po.pageNo + 1
            })
            this.loadData()
        }
    }

    getPost(post) {
        for (let item of this.data.vo.Position) {
            if (item.role == post) {
                return item.name
            }
        }
        return '没有岗位信息'
    }


    loadData() {  //加载数据 返回Promise
        return this.$post(this.data.vo.loadUrl, Object.assign({}, {
            "version": "0.0.1",
            "session": this.data.vo.session
        }, this.data.po)).then(data=> {
            let temp = data.obj.map(item=> {
                let post = []
                item.post.split(',').map(p=> {
                    post.push(this.getPost(p))
                })
                item.post = post.join('|')
                item.workStatus = this.$getEnumName('WT_ACT_STATUS', item.workStatus)
                return item
            })
            this.setData({
                'vo.total': data.totalSize,
                'vo.list': this.data.vo.list.concat(temp),
            })
            return Promise.resolve()
        }).catch(err=> {
            return Promise.resolve()
        })
    }

    changeStatus(e) {
        let info = e.target.dataset.info;
        this.$showModal({
            title: '提示',
            content: `确认设【${info.name}】为${(info.status == 'Y' ? '无效' : '有效')}吗?`
        }).then(data=> {
            if (data.confirm) {
                this.$post('/employee/changeEmployeeStatus.do', {
                    "version": "0.0.1",
                    "session": this.data.vo.session,
                    "firstVal": info.id
                }).then(data=> {
                    this.loadData()
                }).catch(err=> {
                    this.$showModal({
                        title: '错误',
                        content: err.message,
                        showCancel: false
                    })
                })
            }
        })
    }

    edit(e) {
        let id = e.target.dataset.id
        if (id) {
            this.$navigateTo(`/pages/bmem/employee/add/index?id=${id}`)
        }

    }

    add() {
        this.$navigateTo("/pages/bmem/employee/add/index")
    }

}
