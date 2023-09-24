// 购物车页面
import {showMessage, formatCheckBoxOptions, getDateStr, mapKeysToLabel} from '../../utils/index.js';
// 获取全局变量上共享的环境获取数据
const app = getApp();
const {deepOptions: options, shallowOptions} = formatCheckBoxOptions(app && app.globalData && app.globalData.category);

Page({
    data: {
        service: app.globalData.cart || [], // 选择的服务
        name: '', // 姓名
        phone: '', // 电话
        notes: '', // 备注
        area: '', // 小区
        room_no: '', // 楼号
        options,
        conf: {}
    },
    onLoad(conf) {
        const service_name = mapKeysToLabel(options, app.globalData.cart);
        this.db = app.globalData.wxCloud.database();
        // 如果是首页跳转, 服务checkbox使用一级目录(假定首页跳转是需求不明确的用户，二级目录是需求明确的用户)
        if (conf.type === 'index') {
            this.setData({
                conf,
                options: shallowOptions
            });
        }
        else {
            this.setData({
                service_name,
                service: app.globalData.cart
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
        const [idx, service] = (event.detail.value && event.detail.value[0]).split(',');
        const serviceList = [...this.data.service, service];
        this.setData({
            service: serviceList,
            service_name: mapKeysToLabel(this.data.options, serviceList),
            [`options[${idx}].active`]: !this.data.options[idx].active
        });
    },
    submitForm() {
        const me = this;
        const {conf, name, phone, service, notes, area, room_no} = me.data;
        const formData = {
            type: conf.type === 'index' ? 'from_index' : 'from_detail',
            name, phone, service, notes, area, room_no,
            create_time: getDateStr()
        };

        if (name && service.length > 0) {
            me.db.collection('housing_forms').add({
                // data 字段表示需新增的 JSON 数据
                data: formData,
                success: function(res) {
                    showMessage('success', me, '提交成功自动跳转订单列表(刘师傅将稍后联系您)');
                    setTimeout(() => {
                        wx.navigateTo({url: '/pages/order/index'});
                        me.setData({name: '', phone: '', service: [], notes: ''});
                    }, 3000)
                },
                fail: function(err) {
                    showMessage('error', me, '提交失败请稍后重试');
                }
            });
        } else {
            showMessage('error', me, '请完善信息后再提交');
        }
    }
});
