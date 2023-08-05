// 购物车页面
import {showMessage, formatCheckBoxOptions} from '../../utils/index.js';
// 获取全局变量上共享的环境获取数据
const app = getApp();
Page({
    data: {
        // 名称
        name: '',
        // 电话
        phone: '',
        // 备注
        notes: '',
        // 选择的服务
        service: [],
        avatarUrl: '',
        options: formatCheckBoxOptions(app && app.globalData && app.globalData.category)
    },
    onLoad() {
        this.db = app.globalData.wxCloud.database();
    },
    setFormData(event) {
        const key = event.target.dataset.label;
        const value = event.detail && event.detail.value;
        this.setData({
            [key]: value
        });
    },
    handleCheckbox(event) {
        this.setData({
            service: event.detail.value,
        });
    },
    submitForm() {
        const me = this;
        const {name, phone, service, notes} = me.data;
        const formData = {name, phone, service, notes};

        if (name && service.length > 0) {
            me.db.collection('housing_forms').add({
                // data 字段表示需新增的 JSON 数据
                data: formData,
                success: function(res) {
                    showMessage('success', me, '提交成功自动跳转订单列表(刘师傅将稍后联系您)');
                    setTimeout(() => {
                        wx.navigateTo({url: '/pages/order/index'});
                        me.setData({
                            name: '', phone: '', service: [], notes: ''
                        });
                    }, 3000)
                },
                fail: function(err) {
                    showMessage('error', me, '提交失败请稍后重试');
                }
            });
        } else {
            let tips = !service.length ? '服务' : (!name ? '姓名': '');
            showMessage('error', me, `请完善${tips}信息后再提交`);
        }
    }
});
