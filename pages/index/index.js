// 小程序首页:
const app = getApp();
Page({
    data: {
        imageList: ['https://appleimage.liba.com/o_1guseooc2dg117s61mhi1opo1k46v.jpg-image1.w664h500'],
        img1: 'https://tdesign.gtimg.com/miniprogram/images/example1.png',
        img2: 'https://tdesign.gtimg.com/miniprogram/images/example2.png',
        img3: 'https://tdesign.gtimg.com/miniprogram/images/example3.png',
        category: []
    },
    onLoad() {
        // 初始化
    },
    init(imageList, category) {
        this.setData({
            imageList,
            category: category.slice(0, 8)
        })
    }
});
