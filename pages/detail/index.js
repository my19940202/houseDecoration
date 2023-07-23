// index.js
import Message from 'tdesign-miniprogram/message/index';
const app = getApp();
Page({
    data: {
        category: {},
        detail: {
            images: app.globalData.imageList
        },
        form: {
            name: '',
            phone: '',
            text: ''
        }
    },
    onLoad(options) {
        const me = this;
        me.setData({category: options});
        // 从全局变量的共享云环境查询数据
        me.db = app.globalData.wxCloud.database();
        me.db.collection('housing_details').where({key: options.key}).get().then(res => {
            if (res.data && res.data[0]) {
                me.setData({
                    detail: {...me.data.detail, ...res.data[0]}
                });
            }
        });
    },
    setFormData(event) {
        const key = event.target.dataset.label;
        const value = event.detail && event.detail.value;
        this.setData({
            form: {
                ...this.data.form,
                [key]: value
            }
        });
    },
    submitForm() {
        const {name, phone, text} = this.data.form;
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
