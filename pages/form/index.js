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
        // 获取全局变量上共享的环境获取数据
        var appInstance = getApp();
        this.db = appInstance.globalData.wxCloud.database();
        this.db.collection('housing_forms').get().then(res => {
            this.setData({
                list: res.data
            });
        })
    },
    setFormData(event) {
        const key = event.target.dataset.label;
        const value = event.detail && event.detail.value;
        this.setData({
            [key]: value
        });
    },
    submitForm() {
        const {name, phone, text} = this.data;
        this.db.collection('housing_forms').add({
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
