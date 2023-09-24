// 小程序首页:
import {bookImg, defImg, defPoster, defCategory} from './../../constant/index.js';
const app = getApp();
Page({
    data: {
        imageList: [defPoster],
        defImg,
        category: defCategory
    },
    onLoad() {
        // 初始化
    },
    // 支持分享小程序
    onShareAppMessage() {
        return { 
            title: '刘师傅一站式家装',
            path: '/pages/index/index' ,
            success: function (res) {},
            fail: function (res) {}
        }
    },
    init(imageList, category) {
        if (category && category.length) {
            category = [
                ...category.slice(0, 7).map(item => ({
                    ...item.items[0],
                    url: `/pages/detail/index?key=${item.items[0].key}&label=${item.items[0].label}`
                })),
                {
                    label: '立即预约',
                    image: bookImg,
                    url: '/pages/cart/index?type=index'
                }
            ];   
        }
        this.setData({imageList, category});
    },
   onShareTimeline: function() {
        return {
            title: '刘师傅一站式家装',
        }
    }
});
