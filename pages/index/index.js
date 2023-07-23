// 小程序首页:
import {moreIcon, defImg} from './../../constant/index.js';
const app = getApp();
Page({
    data: {
        imageList: [
            'https://appleimage.liba.com/o_1guseooc2dg117s61mhi1opo1k46v.jpg-image1.w664h500'
        ],
        defImg,
        category: []
    },
    onLoad() {
        // 初始化
    },
    init(imageList, category) {
        category = [
            ...category.slice(0, 7).map(item => item.items[0]),
            {label: '查看更多', image: moreIcon}
        ];
        this.setData({imageList, category});
    },
    jumpTo(event) {
        const type = event.target.dataset.type;
        if (type.includes('更多')) {
            wx.switchTab({url: '/pages/category/index'});
        }
        else {
            wx.navigateTo({url: `/pages/detail/index?category=${event.target.dataset.type}`});
        }
    }
});
