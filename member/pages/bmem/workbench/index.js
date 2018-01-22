let we = require('../../../we/index.js')

new class extends we.Page {
    data() {
        return {
            vo: {
                noComp:true,
                "公司": [],
                "商品": [],
                "采购": [],
                "销售": [],
                userInfo: {},
                compInfo: {},
                nickname: '',
                PositionList: []
            }
        }
    }

    onReady() {
        this.$getUserInfo({
            withCredentials: false,
            lang: 'zh_CN'
        }).then(data=> {
            this.setData({
                'vo.nickname': data.userInfo.nickName
            })
        })
    }


    onShow() {
        this.$getSession().then(sid=> {
            this.$post("/bfunclist/findFuncListInfo.do", { //获取公司权限数据
                "version": "0.0.1",
                "session": sid,
                "firstVal": "1",//公司ID
                "second": "1"//员工Id
            }).then(data=> {
                this.setData({
                    "vo.公司": data.obj["我的公司"],
                    'vo.商品': data.obj["我的商品"],
                    'vo.采购': data.obj["采购系统"],
                    'vo.销售': data.obj["销售系统"]
                })
            }).catch((err)=> {
                this.$showModal({
                    title: '获取工作台数据错误',
                    content: err.message,
                    showCancel: false
                })
            })

            //岗位信息
            this.$post("/compAttr/fetchPositionList.do", {
                "version": "0.0.1",
                "session": sid
            }).then(data=> {
                wx.setStorageSync("PositionList", data.obj)
                this.setData({
                    'vo.PositionList': data.obj
                });

                this.$post("/bfunclist/fetchCompAndUserInfo.do", {  //获取公司信息和当前用户信息
                    "session": sid
                }).then(data=> {
                    data.obj.compLogo = "https://api.ionelink.com" + data.obj.compLogo
                    if(data.obj.compName){//如果有公司
                        let post = []
                        data.obj.position.split(',').map(p=> {
                            post.push(this.getPost(p))
                        })
                        data.obj.authStatus = this.$getEnumName('WT_AUTH_STATUS', data.obj.authStatus)
                        data.obj.tradeStatus = this.$getEnumName('WT_TRADE_STATUS', data.obj.tradeStatus)
                        data.obj.compLevel = this.$getEnumName('WT_LEGAL_LEVEL', data.obj.compLevel)
                        data.obj.position = post.join('/')
                        this.setData({
                            'vo.noComp':false,
                            "vo.userInfo": data.obj
                        })
                    }else{
                        this.setData({
                            "vo.userInfo": data.obj,
                            'vo.noComp':true
                        })
                    }


                }).catch((err)=> {
                    this.$showModal({
                        title: '获取公司信息和用户信息错误',
                        content: err.message,
                        showCancel: false
                    })
                })
            })


            this.$post("/company/fetchCompInfo.do", {  //获取公司详情
                "version": "0.0.1",
                "session": sid,
                "firstVal": "1"
            }).then(data=> {
                wx.setStorageSync("compInfo", data.obj||{})
            }).catch((err)=> {
                wx.setStorageSync("compInfo", {})
                this.$showModal({
                    title: '获取公司详情错误',
                    content: err.message,
                    showCancel: false
                })
            })
        })
    }

    getPost(post) { //根据数据获取岗位信息
        for (let item of this.data.vo.PositionList) {
            if (item.role == post) {
                return item.name
            }
        }
        return post
    }

    toSwitchComp() {
        this.$navigateTo(`/pages/bmem/complist/index`)
    }

    toViewCompMore() {
        this.$navigateTo("/pages/bmem/comp/more/index")
    }

    toAddComp(){
        this.$navigateTo("/pages/bmem/comp/reg/index")
    }

    toAccount() {
        this.$navigateTo("/pages/cmem/account/index")
    }

    toProdInfoMgr() {
        this.$navigateToMiniProgram({
            appId: 'wxd20acafd48bd6dbf',
            path: '/pages/prod/prodinfo/list/index',
            extraData: {from: '会员中心-工作台'},
            envVersion: 'develop'
        }).then((data)=> {
            console.info("调用成功")
        }).catch((err)=> {
            console.error("调用失败：" + err)
        })
    }

    toDistrMgr() {
        this.$navigateToMiniProgram({
            appId: 'wxd20acafd48bd6dbf',
            path: '/pages/prod/distribution/list/index',
            extraData: {from: '会员中心-工作台'},
            envVersion: 'develop'
        }).then((data)=> {
            console.info("调用成功")
        }).catch((err)=> {
            console.error("调用失败：" + err)
        })
    }
}