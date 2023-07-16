// app.js 入口
App({
    onLaunch: async function () {
        if (wx.cloud) {
            // 初始化分享资源方wx.cloud: AppID + 资源方环境ID
            const wxCloud = new wx.cloud.Cloud({
                resourceAppid: 'wx47cf005024af6c8f',
                resourceEnv: 'cloud1-5g5eyjtze161c202',
            });
            await wxCloud.init();
            this.globalData = {wxCloud};
            // 获取初始化配置
            this.fetchInitData();
        }
    },
    async fetchInitData() {
        const db = this.globalData.wxCloud.database();
        const curPage = getCurrentPages();
        db.collection('housing_configs').get({type: 'index_poster'}).then(res => {
            // 扩组件通信
            res.data && res.data[0]
                && curPage[0].init(res.data[0].images);
        })
    }
});
