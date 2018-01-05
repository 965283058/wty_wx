let we = require('../../../../we/index.js')
// let urls = require('../util/map.js')
// let apis = require('../apis/user')
// let toast = require('../../weui/toast/index')
// let mix = require('../util/mix')

new class extends we.Page {
    data() {
        return {
            po: {},
            vo: {}
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
    toMore(){
    	this.$navigateTo("/pages/prod/prodinfo/more/index")
    }
}
