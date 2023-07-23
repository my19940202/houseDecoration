const image = 'https://res.app.ikea.cn/content/u/20220119/f99644d37a3641bab08a0f4806bdc2d2.jpg?x-oss-process=image//interlace,1/resize,w_200';
const items = new Array(10).fill({ label: '标题' }, 0, 10);
const app = getApp();

Page({
    offsetTopList: [],
    data: {
        sideBarIndex: 0,
        scrollTop: 0,
        categories: app.globalData.category
    },
    onLoad() {
        // this.setData({
        //     category: app.globalData.category
        // });
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
    jumpTo(event) {
        wx.navigateTo({
            url: `/pages/detail/index?type=${event.target.dataset.type}`
        });
    }
});
