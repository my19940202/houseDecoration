// 订单页面
import {mapKeysToLabel, formatCheckBoxOptions} from '../../utils/index.js';
// 从全局变量的共享云环境查询数据
const app = getApp();
const {deepOptions} = formatCheckBoxOptions(app && app.globalData && app.globalData.category);
const {wxCloud, openId: _openid, isAdmin} = app.globalData;

Page({
    data: {
        list: []
    },
    onLoad() {
        const condition = isAdmin ? {} : {_openid};
        this.db = wxCloud.database();
        this.db.collection('housing_forms')
            .where(condition)
            .orderBy('create_time', 'desc')
            .get().then(res => {
                if (res.data && res.data.length) {
                    this.setData({
                        list: res.data.map(item => {
                            const service_name = item.type === 'from_index'
                                ? item.service : mapKeysToLabel(deepOptions, item.service);
                            return {
                                service_name,
                                is_admin: _openid === item._openid,
                                ...item
                            }
                        })
                    });
                }
            });
    }
})