let we = require('../../../we/index.js')

new class extends we.Page {
    data() {
        return {
        	text: " 昵称"
        }
    }

    toSwitchComp(){
      this.$navigateTo("/pages/sales/complist/index")
    }

    toViewCompMore(){
      this.$navigateTo("/pages/bmem/comp/more/index")
    }

    toAccount(){
        this.$navigateTo("/pages/cmem/account/index")
      }
    
    toProdInfoMgr(){
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
    
    toDistrMgr(){
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