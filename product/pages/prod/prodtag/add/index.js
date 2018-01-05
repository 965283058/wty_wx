let we = require('../../../../we/index.js')
// let urls = require('../util/map.js')
// let apis = require('../apis/user')
// let toast = require('../../weui/toast/index')
// let mix = require('../util/mix')

new class extends we.Page {
    data() {
        return {
            po: {status: ''},
            vo: {
                statusList: ['有效', "无效"]
            }
        }
    }

    onReady() {
      var pages = getCurrentPages();//获取加载的页面
      var currentPage = pages[pages.length - 1];//获取当前页面的对象
      //var url = currentPage.route;//当前页面url
      var options = currentPage.options;//如果要获取url中所带的参数可以查看options
      for (var key in options) {
        var value = options[key];
        if(value!=null){
          wx.setNavigationBarTitle({ title: '编辑商品标签' });
        }   
      }
    }
    changeDefault(){

    }
    
    save(){
    	this.$navigateTo("/pages/prod/prodtag/list/index");
    }

}
