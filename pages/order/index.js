// 购物车页面
import {mapKeysToLabel, formatCheckBoxOptions} from '../../utils/index.js';
// 从全局变量的共享云环境查询数据
const app = getApp();
const {deepOptions} = formatCheckBoxOptions(app && app.globalData && app.globalData.category);

Page({
    data: {list: []},
    onLoad() {
        const {wxCloud, openId: _openid, isAdmin} = app.globalData;
        const condition = isAdmin ? {} : {_openid};
        this.db = wxCloud.database();
        this.db.collection('housing_forms')
            .where(condition)
            .get().then(res => {
                if (res.data && res.data.length) {
                    this.setData({
                        list: res.data.map(item => ({
                            service_name: mapKeysToLabel(deepOptions, item.service),
                            ...item
                        }))
                    });
                }
            });
    }
})