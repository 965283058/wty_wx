let we = require('../../../../we/index.js')


new class extends we.Page {
    data() {
        return {
            po: {},
            vo: {
                scrollViewHeight: 300,
                list:[1,2,3,4]
            }
        }
    }

    onReady() {
        this.$getSystemInfo().then((info)=> {
            this.setData({
                'vo.scrollViewHeight': info.windowHeight - 160
            })
        })
    }

    toView() {
    	 this.$navigateTo("/pages/bmem/comp/viewCard/index")
    }
}
