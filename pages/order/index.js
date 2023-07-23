Page({
    data: {
        list: []
    },
    onLoad() {
        // 从全局变量的共享云环境查询数据
        var appInstance = getApp();
        this.db = appInstance.globalData.wxCloud.database();
        this.db.collection('housing_forms').get().then(res => {
            this.setData({
                list: res.data.map((item, index) => ({
                    idx: index + 1,
                    ...item
                }))
            });
        })
    }
})