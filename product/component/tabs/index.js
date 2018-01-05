Component({
    options: {
        multipleSlots: true // 在组件定义时的选项中启用多slot支持
    },
    properties: {
        index: {
            type: Number,
            value: 0
        },
        data: { // 属性名
            type: Array, // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
            value: [], // 属性初始值（可选），如果未指定则会根据类型选择一个
        },
    },
    data: {
        inputShowed: false,
        inputVal: ""
    },
    methods: {
        select: function (e) {
            this.setData({
                index: e.target.dataset.index
            });
        }
    }
})