// 详情页
import {showMessage} from '../../utils/index.js';
import {defPoster} from './../../constant/index.js';
const app = getApp();
Page({
    data: {
        category: {},
        detail: {
            images: []
        },
        form: {
            name: '',
            phone: '',
            text: ''
        },
        count: 0
    },
    onLoad(options) {
        const me = this;
        me.setData({
            category: options,
            count: app.globalData.cart.length
        });
        // 从全局变量的共享云环境查询数据
        me.db = app.globalData.wxCloud.database();
        me.db.collection('housing_details').where({key: options.key}).get().then(res => {
            if (res.data && res.data[0]) {
                me.setData({
                    detail: {...me.data.detail, ...res.data[0]}
                });
            }
        });
        // 动态更新详情页的标题
        options.label && wx.setNavigationBarTitle({title: options.label});

        // 如果没有图片 实验菜单栏的图片作为默认图片
        if (!me.data.detail.images.length) {
            let targetImage = '';
            app.globalData.category.some(ele => {
                ele.items.some(item => {
                    if (item.key === options.key) {
                        targetImage = item.image;
                    }
                    return item.key === options.key;
                });
                return !!targetImage;
            });

            me.setData({
                detail: {
                    ...me.data.detail,
                    images: [targetImage || defPoster]
                }
            });
        }
    },
    setFormData(event) {
        const key = event.target.dataset.label;
        const value = event.detail && event.detail.value;
        this.setData({
            form: {
                ...this.data.form,
                [key]: value
            }
        });
    },
    handleBtmBarClick(event) {
        const type = event.target.dataset.type;
        const {key, label} = this.data.category;
        if (type === 'cart') {
            wx.navigateTo({url: '/pages/cart/index'});
        }
        if (type === 'add') {
            // 临时存储选中的购物车信息
            if (!app.globalData.cart.includes(key)) {
                app.globalData.cart.push(key);
                this.setData({
                    count: this.data.count + 1
                })
                showMessage('success', this, `${label}已加入购物车`);
            }
        }
    }
});
