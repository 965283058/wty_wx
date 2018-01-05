Component({
    properties: {
        placeholder: {
            type: String,
            value: ''
        },
        focus: {
            type: Boolean,
            value: false
        }
    },
    data: {
        inputVal: ""
    },
    methods: {
        focus: function () {
            this.setData({
                focus: true
            });
            console.info("shpw")
        },
        blue: function () {
            this.setData({
                inputVal: "",
                focus: false
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