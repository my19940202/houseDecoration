// 购物车页面
import {mapKeysToLabel, formatCheckBoxOptions} from '../../utils/index.js';
// 从全局变量的共享云环境查询数据
const app = getApp();
const options = formatCheckBoxOptions(app && app.globalData && app.globalData.category);

Page({
    data: {
        list: []
    },
    onLoad() {
        const {wxCloud, openId: _openid, isAdmin} = app.globalData;
        const condition = isAdmin ? {} : {_openid};
        this.db = wxCloud.database();
        this.db.collection('housing_forms')
            .where(condition)
            .get().then(res => {
            this.setData({
                list: res.data.map((item, index) => ({
                    idx: index + 1,
                    service_name: mapKeysToLabel(options, item.service),
                    ...item
                }))
            });
        })
    }
})