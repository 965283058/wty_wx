let we = require('../../../../we/index.js')
// let urls = require('../util/map.js')
// let apis = require('../apis/user')
// let toast = require('../../weui/toast/index')
// let mix = require('../util/mix')

new class extends we.Page {
    data() {
        return {
            po: {},
            vo: {
                list: [{type:'品牌'},{type:'商标'},{type:'加工方式'},{type:'价格区间'}]
            }
        }
    }

    onReady() {

    }
    toAdd(){
    	this.$navigateTo("/pages/prod/prodinfo/add/index")
    }
    toList(){
    	this.$navigateTo("/pages/prod/prodinfo/list/index")
    }    
    
    moreBase(){
    	this.$navigateTo("/pages/prod/prodinfo/moreBase/index")
    }        
    moreSearchSet(){
    	this.$navigateTo("/pages/prod/prodinfo/moreSearchSetting/index")
    }        
    moreDesc(){
    	this.$navigateTo("/pages/prod/prodinfo/moreDescribe/index")
    }        
    morePurchaseInfo(){
    	this.$navigateTo("/pages/prod/prodinfo/morePurchaseInfo/index")
    }        
    moreSaleInfo(){
    	this.$navigateTo("/pages/prod/prodinfo/moreSaleInfo/index")
    }        
}
