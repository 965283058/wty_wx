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
    returnList(){
    	this.$navigateTo("/pages/prod/distribution/list/index");
    }
    add(){
    	this.$navigateTo("/pages/prod/distribution/add/index");
    }

}
