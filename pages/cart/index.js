// 购物车页面
import {showMessage, formatCheckBoxOptions, getDateStr, mapKeysToLabel} from '../../utils/index.js';
// 获取全局变量上共享的环境获取数据
const app = getApp();
const {deepOptions: options, shallowOptions} = formatCheckBoxOptions(app && app.globalData && app.globalData.category);
const service_name = mapKeysToLabel(options, app.globalData.cart);

Page({
    data: {
        // 名称
        name: '',
        // 电话
        phone: '',
        // 备注
        notes: '',
        // 选择的服务
        service: app.globalData.cart || [],
        service_name,
        options,
        conf: {}
    },
    onLoad(conf) {
        this.db = app.globalData.wxCloud.database();
        // 如果是首页跳转, 服务checkbox使用一级目录(假定首页跳转是需求不明确的用户，二级目录是需求明确的用户)
        if (conf.type === 'index') {
            this.setData({
                options: shallowOptions
            });
        }
    },
    setFormData(event) {
        const key = event.target.dataset.label;
        const value = event.detail && event.detail.value;
        this.setData({
            [key]: value
        });
    },
    handleCheckbox(event) {
        const service = event.detail.value;
        this.setData({
            service,
            service_name: mapKeysToLabel(this.data.options, service)
        });
    },
    submitForm() {
        const me = this;
        const {name, phone, service, notes} = me.data;
        const formData = {
            name, phone, service, notes, create_time: getDateStr()
        };

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
