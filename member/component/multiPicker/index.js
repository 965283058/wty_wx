Component({
    options: {
        multipleSlots: false // 在组件定义时的选项中启用多slot支持
    },
    data: {
        height: 500,
        show: false
    },
    properties: {
        valueField: {
            type: String,
            value: 'id'
        },
        textField: {
            type: String,
            value: 'name'
        },
        value: {
            type: String,
            value: '',
            observer: function (value) {  //数据改变修改
                let arr = []
                if (value) {
                    arr = value.split(',')
                }
                let i = 0;
                let check = false
                for (let item of this.data.range) {
                    if (arr.indexOf(item[this.data.valueField]) > -1) {
                        check = true
                    } else {
                        check = false
                    }
                    this.setData({
                        [`range[${i}].__checked__`]: check
                    });
                    i++
                }
                this.sure()
            }
        },
        range: {
            type: Array,
            value: []
        }
    },
    methods: {
        check: function (e) {
            let info = e.currentTarget.dataset.info
            if (info) {
                for (let i = 0; i < this.data.range.length; i++) {
                    if (this.data.range[i][this.data.valueField] == info[this.data.valueField]) {
                        this.setData({
                            [`range[${i}].__checked__`]: !this.data.range[i].__checked__
                        });
                        break;
                    }
                }
            }
        },
        sure: function () {
            let result = []
            for (let item of this.data.range) {
                if (item.__checked__) {
                    result.push(item)
                }
            }
            this.triggerEvent('change', result)
            this.cancel()
        },
        cancel: function (e) {
            this.setData({
                show: false
            });
        },
        showPicker(){
            this.setData({
                show: true
            });
        }
    },
    ready(){
        let self = this
        wx.getSystemInfo({
            success: function (data) {
                self.setData({
                    height: data.windowHeight
                })
            }
        })
    }
})