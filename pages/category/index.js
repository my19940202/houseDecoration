const image = 'https://res.app.ikea.cn/content/u/20220119/f99644d37a3641bab08a0f4806bdc2d2.jpg?x-oss-process=image//interlace,1/resize,w_200';
const items = new Array(10).fill({ label: '标题' }, 0, 10);

Page({
    offsetTopList: [],
    data: {
        sideBarIndex: 0,
        scrollTop: 0,
        categories: [
            {
                label: '门窗',
                title: '门窗淋浴房',
                items: [
                    {label: '​平移窗封阳台', image: 'https://636c-cloud1-5g5eyjtze161c202-1319072486.tcb.qcloud.la/static/housing/window.webp?sign=8c58a60728d3f5a4326da5dc61a9903d&t=1689689797'},
                    {label: '漂移窗封阳台', image: 'https://636c-cloud1-5g5eyjtze161c202-1319072486.tcb.qcloud.la/static/housing/window.webp?sign=8c58a60728d3f5a4326da5dc61a9903d&t=1689689797'},
                    {label: '​内开窗封阳台', image: 'https://636c-cloud1-5g5eyjtze161c202-1319072486.tcb.qcloud.la/static/housing/window.webp?sign=8c58a60728d3f5a4326da5dc61a9903d&t=1689689797'},
                    {label: '​淋浴房', image: 'https://636c-cloud1-5g5eyjtze161c202-1319072486.tcb.qcloud.la/static/housing/shower.webp?sign=090bb0799ead19536d2f6767b8cbef04&t=1689689904'},
                    {label: '​卫生间玻璃移门', image: 'https://636c-cloud1-5g5eyjtze161c202-1319072486.tcb.qcloud.la/static/housing/yimen.avif?sign=75193c93645bf8d370d11275a56e835d&t=1689690297'},
                    {label: '​折叠门', image: ""}
                ]
            },
            {
                label: '硬装',
                title: '硬装局改',
                items: [
                    {label: '​通铺地板/瓷砖', image},
                    {label: '​阳台墙砖', image},
                    {label: '​室内拆墙与改造', image},
                    {label: '​吊顶扩宽与定制', image},
                    {label: '​移电位', image},
                    {label: '​阳台刷漆', image},
                    {label: '​室内刷漆', image}
                ]
            },
            {
                label: '回收​',
                title: '物品回收​',
                items: [
                    {label: '​木板回收', image},
                    {label: '​家电回收', image},
                    {label: '​阳台移门回收', image}
                ]
            },
            {
                label: '​橱柜',
                title: '​橱柜/阳台柜',
                items: [
                    {label: '​橱柜换台面', image},
                    {label: '​橱柜拉篮升级', image},
                    {label: '​橱柜全升级', image},
                    {label: '​阳台柜定制', image},
                    {label: '​飘窗柜定制', image}
                ]
            },
            {
                label: '​全屋定制',
                title: '​全屋定制',
                items: [
                    {label: '​索菲亚', image},
                    {label: '​欧派', image},
                    {label: '​我乐', image},
                    {label: '​工厂定制', image}
                ]
            },
            {
                label: '​纱窗',
                title: '​纱窗定制',
                items: [
                    {label: '​高透网纱窗', image},
                    {label: '​隐形纱窗', image}
                ]
            },
            {
                label: '​安装',
                title: '​安装服务',
                items: [
                    {label: '​灯具安装', image},
                    {label: '​家电安装', image},
                    {label: '​网络安装', image},
                    {label: '​其他安装', image}
                ]
            },
            {
                label: '窗帘',
                title: '窗帘',
                items: [
                    {label: '​全屋窗帘', image},
                    {label: '​百叶帘', image}
                ]
            },
            {
                label: '美缝​',
                title: '全屋美缝​',
                items: [
                    {label: '​德高美缝', image},
                    {label: '​皇氏工匠美缝', image},
                    {label: '​卓高美缝', image},
                    {label: '​瓦克收边', image}
                ]
            },
            {
                label: '门套',
                title: '门套',
                items: [
                    {label: '木制门套', image},
                    {label: '​不锈钢门套', image},
                    {label: '直接刷漆，不做门套', image}
                ]
            },
            {
                label: '​其他',
                title: '​其他项目',
                items: [
                    {label: '​扫地机器人位置改造', image},
                    {label: '​反坎贴砖', image},
                    {label: '​改插座', image},
                    {label: '​未列项目可直接咨询', image}
                ]
            }
        ]
    },
    onLoad() {
        // 载入后动态就算每个分类标题的top 用于后续滚动定位
        const query = wx.createSelectorQuery().in(this);
        const {sideBarIndex} = this.data;
        query.selectAll('.title')
            .boundingClientRect((rects) => {
                console.log(rects, 'rects');
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
