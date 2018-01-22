let we = require('../../../../we/index.js')


new class extends we.Page {
    data() {
        return {
            po: {choose: '自定义（暂不支持）'},
            vo: {
                chooseList: ['自定义（暂不支持）', "北京"]
            }
        }
    }
    toSave() {
      this.$navigateBack();
    }

}
