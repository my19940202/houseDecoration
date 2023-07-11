// 表单提交测试页面
import Message from 'tdesign-miniprogram/message/index';

Page({
    data: {
        name: '',
        phone: '',
        text: '',
        list: []
    },
    onLoad() {
        const db = wx.cloud.database();
        console.log('form page');
        db.collection('housing_forms').get().then(res => {
            // res.data 包含该记录的数据
            console.log(res.data)
            this.setData({
                list: res.data
            });
        })
    },
    setFormData(event) {
        console.log('event', event);
        const key = event.target.dataset.label;
        const value = event.detail && event.detail.value;
        this.setData({
            [key]: value
        });
    },
    submitForm() {
        const db = wx.cloud.database();
        const {name, phone, text} = this.data;
        db.collection('housing_forms').add({
            // data 字段表示需新增的 JSON 数据
            data: {name, phone, text},
            success: function(res) {
                Message.info({
                    context: this,
                    offset: [20, 32],
                    duration: 3000,
                    content: '提交成功',
                });
            },
            fail: function(err) {
                Message.error({
                    context: this,
                    offset: [20, 32],
                    duration: 3000,
                    content: '提交失败',
                });
            }
        })
    }
});
