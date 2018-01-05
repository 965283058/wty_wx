let we = require('../../../we/index.js')

new class extends we.Page {
    data() {
        return {
        }
    }
    toReg() {
        this.$navigateTo("/pages/bmem/comp/reg/index")
    }
    switchComp() {
        this.$navigateBack();
    } 

}
