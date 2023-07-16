// 小程序首页:
const app = getApp();
Page({
    data: {
        imageList: ['https://appleimage.liba.com/o_1guseooc2dg117s61mhi1opo1k46v.jpg-image1.w664h500']
    },
    onLoad() {
        // 获取轮播图片url
        // this.db = app.globalData.wxCloud.database();
        console.log('this is onload');
    },
    init(imageList) {
        this.setData({imageList})
    }
});
