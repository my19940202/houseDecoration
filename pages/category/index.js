import {defImg} from './../../constant/index.js';
import {showMessage} from '../../utils/index.js';
const app = getApp();

Page({
    offsetTopList: [],
    data: {
        defImg,
        sideBarIndex: 0,
        scrollTop: 0,
        categories: app.globalData.category
    },
    onLoad(options) {
        // url传参时更新active bar
        if (options.index !== undefined) {
            this.setData({sideBarIndex: options.index})
        }
        // 载入后动态就算每个分类标题的top 用于后续滚动定位
        const query = wx.createSelectorQuery().in(this);
        const {sideBarIndex} = this.data;
        query.selectAll('.title')
            .boundingClientRect((rects) => {
                this.offsetTopList = rects.map((item) => item.top);
                this.setData({ scrollTop: rects[sideBarIndex].top });
            })
        .exec();
    },
    // 侧边栏点击响应
    onSideBarChange(e) {
        const {value} = e.detail;
        this.setData({
            sideBarIndex: value,
            scrollTop: this.offsetTopList[value]
        });
    },
    // 滑动的时候切换侧边栏activeIdx
    onScroll(e) {
        const {scrollTop} = e.detail;
        // 下一个标题与顶部的距离
        const threshold = 50;
        if (scrollTop < threshold) {
            this.setData({ sideBarIndex: 0 });
            return;
        }
        const index = (this.offsetTopList || []).findIndex((top) => top > scrollTop && top - scrollTop <= threshold);
        if (index > -1) {
            this.setData({ sideBarIndex: index });
        }
    },
    handleCellClick(event) {
        const {key, query, type} = (event.target.dataset || {});
        if (type === 'icon') {
            if (!app.globalData.cart.includes(key)) {
                app.globalData.cart.push(key);
                showMessage('success', this, '已加入购物车');
            }
        }
        else {
            wx.navigateTo({url: `/pages/detail/index?${query}`});
        }
    }
});
