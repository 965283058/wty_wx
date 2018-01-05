Component({
    options: {
        multipleSlots: false // 在组件定义时的选项中启用多slot支持
    },
    properties: {
        disabled: {
            type: Boolean,
            value: false
        },
        checked: {
            type: Boolean,
            value: false
        }
    },
    methods: {
        check: function (e) {
            if (this.properties.disabled) {
                return
            }
            let value = !this.properties.checked
            this.setData({
                checked: value
            });
            this.triggerEvent('change', value)
        }
    }
})