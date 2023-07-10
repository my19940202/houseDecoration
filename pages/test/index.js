// index.js
// const app = getApp()
Page({
    data: {
        haveCreateCollection: false
    },
    onLoad() {
        console.log('this is onLoad')
        const db = wx.cloud.database();
        db.collection('housing_forms').get().then(res => {
            // res.data 包含该记录的数据
            console.log(res.data)
        })
    },
    jumpTo(event) {
        wx.navigateTo({
            url: `/pages/${event.target.dataset.path}/index`,
        });
    }
});
