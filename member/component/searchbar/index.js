Component({
    options: {
        multipleSlots: true // 在组件定义时的选项中启用多slot支持
    },
    properties: {},
    data: {
        inputShowed: false,
        inputVal: ""
    },
    methods: {
        showInput: function () {
            this.setData({
                inputShowed: true
            });
        },
        hideInput: function () {
            this.setData({
                inputVal: "",
                inputShowed: false
            });
        },
        clearInput: function () {
            this.setData({
                inputVal: ""
            });
        },
        inputTyping: function (e) {
            this.setData({
                inputVal: e.detail.value
            });
        }
    }
})