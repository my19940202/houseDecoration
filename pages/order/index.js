Page({
    data: {
        list: []
    },
    onLoad() {
        // 从全局变量的共享云环境查询数据
        const app = getApp();
        const {wxCloud, openId: _openid} = app.globalData;
        this.db = wxCloud.database();
        this.db.collection('housing_forms')
            .where({_openid})
            .get().then(res => {
            this.setData({
                list: res.data.map((item, index) => ({
                    idx: index + 1,
                    ...item
                }))
            });
        })
    }
})