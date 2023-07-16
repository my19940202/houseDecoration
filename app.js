// app.js 入口
App({
    onLaunch: async function () {
        if (wx.cloud) {
            const shareWx = new wx.cloud.Cloud({
                // 资源方 AppID
                resourceAppid: 'wx47cf005024af6c8f',
                // 资源方环境 ID
                resourceEnv: 'cloud1-5g5eyjtze161c202',
            })
            await shareWx.init();
            await wx.cloud.init({env: 'cloud1-5g5eyjtze161c202'});
            this.globalData = {shareWx};
        }
    }
});
