let we = require('../../../../we/index.js')


new class extends we.Page {
    data() {
        return {
            po: {},
            vo: {
                scrollViewHeight: 300,
                session: '',
                compId: '',
                compName: '',
                pageMode: ''//select为其他页面跳到该页面进行选择部门的操作
            }
        }
    }

    onReady() {
        this.$getSystemInfo().then((info)=> {
            this.setData({
                'vo.scrollViewHeight': info.windowHeight - 160
            })
        })
        let compInfo = wx.getStorageSync("compInfo")
        this.setData({
            'vo.compId': compInfo.id,
            'vo.compName': compInfo.name
        })
    }

    onLoad(option) {
        if (option.mode) {
            this.setData({
                'vo.pageMode': option.mode
            })
        }
    }

    onShow() {
        this.$getSession().then(sid=> {
            this.setData({
                'vo.session': sid
            })
            this.loadData()
        })
    }

    loadData() {
        this.$post('/department/fetchAllDepartmentInfo.do', {
            "session": this.data.vo.session,
            "firstVal": wx.getStorageSync("compId")
        }).then(data=> {
            this.setData({
                'vo.list': data.obj
            })
        }).catch(err=> {
            this.$showModal({
                title: '错误',
                content: err.message,
                showCancel: false
            })
        })
    }

    selectDept(e) {
        if (this.data.vo.pageMode == "select") {
            let dept = e.target.dataset.info
            if (dept) {
                let pages = getCurrentPages()
                let prevPage = pages[pages.length - 2];  //上一个页面
                prevPage.setData({
                    selectData: dept
                })
                this.$navigateBack()
            }
        }
    }

    changeStatus(e) {
        let dept = e.target.dataset.info;
        this.$showModal({
            title: '提示',
            content: `确认设【${dept.name}】为${(dept.status == 'Y' ? '无效' : '有效')}吗?`
        }).then(data=> {
            if (data.confirm) {
                this.$post('/department/changeDepartmentStatus.do', {
                    "session": this.data.vo.session,
                    "firstVal": dept.id
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

    addDept(e) {
        //AJAX保存公司信息
        //跳转保存成功页面
        let dept = e.target.dataset.info
        if (!dept) {
            dept = {id: 0, name: this.data.vo.compName}
        }
        this.$navigateTo(`/pages/bmem/department/add/index?id=${dept.id}&name=${dept.name}`)
    }


}
