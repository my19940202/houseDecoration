// index.js
// const app = getApp()
Page({
    data: {
        haveCreateCollection: false
    },
    onLoad() {
        console.log('this is onLoad')
    },
    jumpTo(event) {
        wx.navigateTo({
            url: `/pages/${event.target.dataset.path}/index`,
        });
    }
});
