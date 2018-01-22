let we = require('../../../../we/index.js')


new class extends we.Page {
    data() {
        return {
            po: {
                mobile: ''
            },
            vo: {
                scrollViewHeight: 260,
                list: [],
                session: '',
                pageMode:"" //select为其他页面跳转到该页面进行选择组织结构操作
            }
        }
    }
    onLoad(option) {
        if (option.mode) {
            this.setData({
                'vo.pageMode': option.mode
            })
        }
    }

    onShow(option) {
        this.$getSession().then(sid=> {
            this.setData({
                'vo.session': sid
            })
            this.getList()
        })
    }

    getList() {
        this.$post('/organization/getAllOrganizationInfo.do', {"session": this.data.vo.session}).then(data=> {
            this.setData({
                'vo.list': this.getTreeData(data.obj)
            })
        })
    }

    getTreeData(data) {
        data.__open = true
        if (data.compList && data.compList.length) {
            for (let item of data.compList) {
                this.getTreeData(item)
            }
        }
        return data
    }

    toggle(e) {//展开或收起
        let id = e.target.dataset.id
        let data = this.__toggle(this.data.vo.list, id)

        this.setData({
            'vo.list': data
        })
    }

    __toggle(data, id) {
        if (data.id == id) {
            data.__open = !data.__open
            return data
        }
        if (data.compList && data.compList.length) {
            for (let item of data.compList) {
                this.__toggle(item, id)
            }
        }
        return data
    }


    changeStatus(e) { //修改状态
        let info = e.target.dataset.info;
        this.$showModal({
            title: '提示',
            content: `确认设【${info.name}】为${(info.status == 'Y' ? '无效' : '有效')}吗?`
        }).then(data=> {
            if (data.confirm) {
                this.$post('/organization/changeOrganizationStatus.do', {
                    "session": this.data.vo.session,
                    "firstVal": info.id
                }).then(data=> {
                    this.getList()
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

    add(e) {
        let comp = e.target.dataset.info
        this.$navigateTo(`/pages/bmem/orga/addBranch/index?id=${comp.id}&name=${comp.name}`)
    }

}
