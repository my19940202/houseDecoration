// 公共常量
const defPoster = 'https://appleimage.liba.com/o_1guseooc2dg117s61mhi1opo1k46v.jpg-image1.w664h500';
const moreIcon = 'https://636c-cloud1-5g5eyjtze161c202-1319072486.tcb.qcloud.la/static/housing/more.png?sign=719a42bc69c49b9db3e77c4d3c3fb386&t=1690095705';
const defImg = 'https://636c-cloud1-5g5eyjtze161c202-1319072486.tcb.qcloud.la/static/housing/def_img.png?sign=9d883d3f46cb529e8c4bc41ccd725f27&t=1690095786';
const bookImg = 'https://636c-cloud1-5g5eyjtze161c202-1319072486.tcb.qcloud.la/static/housing/book.png';

const defCategory = [
    {
        image: 'https://636c-cloud1-5g5eyjtze161c202-1319072486.tcb.qcloud.la/static/housing/category/window_pingyi.jpeg',
        key: 'window_pingyi',
        label: '平移窗封阳台',
        url: '/pages/detail/index?key=window_pingyi&label=平移窗封阳台'
    },
    {
        image: 'https://636c-cloud1-5g5eyjtze161c202-1319072486.tcb.qcloud.la/static/housing/category/yzjg_tongpu.jpeg',
        key: 'yzjg_tongpu',
        label: '通铺地板/瓷砖',
        url: '/pages/detail/index?key=yzjg_tongpu&label=通铺地板/瓷砖'
    },
    {
        image: 'https://636c-cloud1-5g5eyjtze161c202-1319072486.tcb.qcloud.la/static/housing/category/recycle_floor.jpeg',
        key: 'recycle_floor',
        label: '木板回收',
        url: '/pages/detail/index?key=recycle_floor&label=木板回收'
    },
    {
        image: 'https://636c-cloud1-5g5eyjtze161c202-1319072486.tcb.qcloud.la/static/housing/category/cupboard_taimian.webp',
        key: 'cupboard_taimian',
        label: '橱柜换台面',
        url: '/pages/detail/index?key=cupboard_taimian&label=橱柜换台面'
    },
    {
        image: 'https://636c-cloud1-5g5eyjtze161c202-1319072486.tcb.qcloud.la/static/housing/category/custom_sofie.jpg',
        key: 'custom_sofie',
        label: '索菲亚',
        url: '/pages/detail/index?key=custom_sofie&label=索菲亚'
    },
    {
        image: 'https://636c-cloud1-5g5eyjtze161c202-1319072486.tcb.qcloud.la/static/housing/category/screenwindow_gaotou.jpeg',
        key: 'screenwindow_gaotou',
        label: '高透网纱窗',
        url: '/pages/detail/index?key=screenwindow_gaotou&label=高透网纱窗'
    },
    {
        image: 'https://636c-cloud1-5g5eyjtze161c202-1319072486.tcb.qcloud.la/static/housing/category/install_lanterns.jpeg',
        key: 'install_lanterns',
        label: '灯具安装',
        url: '/pages/detail/index?key=install_lanterns&label=灯具安装'
    },
    {
        image: 'https://636c-cloud1-5g5eyjtze161c202-1319072486.tcb.qcloud.la/static/housing/book.png',
        label: '立即预约',
        url: '/pages/cart/index?type=index'
    }
]
module.exports = {
    bookImg, defImg, moreIcon, defPoster, defCategory
};
