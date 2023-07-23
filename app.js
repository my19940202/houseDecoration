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
        const me = this;
        const db = me.globalData.wxCloud.database();
        const curPage = getCurrentPages();
        const type = {
            $in: ['index_poster', 'category']
        };

        db.collection('housing_configs').get({type}).then(res => {
            // 组件通信
            const configData = res.data || [];
            if (configData && configData[0] && configData[1]) {
                const imageList = configData[0].images;
                const category = configData[1].list;
                this.globalData.category = category;
                curPage[0].init(imageList, category);
            };
        });

        // 发起云函数请求 获取个用户id
        me.globalData.wxCloud.callFunction({
            name: 'helloworld',
            success: function(res) {
                const {appId, openId} = res.result && res.result.event && res.result.event.userInfo;
                me.globalData = {
                    ...me.globalData, appId, openId
                };
            }
        })
    }
});
