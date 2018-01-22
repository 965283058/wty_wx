Component({
    options: {
        multipleSlots: false // 在组件定义时的选项中启用多slot支持
    },
    properties: {
        checked: {
            type: Boolean,
            value: false
        },
    },
    methods: {
        check: function (e) {
            this.setData({
                checked: !this.properties.checked
            });
        }
    }
})