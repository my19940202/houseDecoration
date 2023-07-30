// 小程序首页:
import {bookImg, defImg, defPoster} from './../../constant/index.js';
const app = getApp();
Page({
    data: {
        imageList: [defPoster],
        defImg,
        category: []
    },
    onLoad() {
        // 初始化
    },
    init(imageList, category) {
        category = [
            ...category.slice(0, 7).map(item => item.items[0]),
            {label: '立即预约', image: bookImg}
        ];
        this.setData({imageList, category});
    }
});
