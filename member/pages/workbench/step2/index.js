let we = require('../../../we/index.js')


new class extends we.Page {
    data() {
        return {
            po: {mobile: '13544567789'},
            vo: {
                scrollViewHeight: 260,
                list:[1,2,3,4]
            }
        }
    }

}
