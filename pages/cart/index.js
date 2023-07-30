// 购物车页面
import Message from 'tdesign-miniprogram/message';
import {formatTreeSelectOptions} from '../../utils/index.js';
// 获取全局变量上共享的环境获取数据
const app = getApp();
Page({
    data: {
        name: '',
        phone: '',
        text: '',
        service: '',
        avatarUrl: '',
        popup: {
            visible: false,
            value: ['0', []],
            selected: [],
            selectedCategory: []
        },
        // 把菜单栏数据转化成tree组件
        category: formatTreeSelectOptions(app.globalData.category)
    },
    onLoad() {
        this.db = app.globalData.wxCloud.database();
        this.db.collection('housing_forms').get().then(res => {
            this.setData({
                list: res.data
            });
        });
        console.log(app.globalData.cart, 'app.globalData.cart');
    },
    setFormData(event) {
        const key = event.target.dataset.label;
        const value = event.detail && event.detail.value;
        this.setData({
            [key]: value
        });
    },
    getUserProfile(e) {
        wx.getUserProfile({
            desc: '用于完善预约信息',
            success: res => {
                if (res && res.userInfo) {
                    const {nickName: name, avatarUrl} = res.userInfo;
                    this.setData({name, avatarUrl});
                }
            }
        })
    },
    submitForm() {
        const {name, phone, text} = this.data;
        this.db.collection('housing_forms').add({
            // data 字段表示需新增的 JSON 数据
            data: {name, phone, text},
            success: function(res) {
                Message.info({
                    context: this,
                    offset: [20, 32],
                    duration: 3000,
                    content: '提交成功',
                });
            },
            fail: function(err) {
                Message.error({
                    context: this,
                    offset: [20, 32],
                    duration: 3000,
                    content: '提交失败',
                });
            }
        })
    },
    onVisibleChange(e) {
        this.setData({
            popup: {
                ...this.data.popup,
                visible: e.detail.visible
            }
        });
    },
    handlePopup() {
        this.setData({
            popup: {
                ...this.data.popup,
                visible: true
            }
        });
    },
    onTreeSelect(e) {
        // 数组去重
        const selected = Array.from(new Set([
            ...this.data.popup.selected,
            ...e.detail.value[1]
        ]));
        const selectedCategory = selected.map(ele => {
            const [p1, p2] = ele.split('-');
            return this.data.category[p1].children[p2].label;
        });
        this.setData({
            popup: {
                ...this.data.popup,
                value: e.detail.value,
                selected,
                selectedCategory
            }
        });
    },
    handleBtmBarClick(e) {
        const type = e.target.dataset.type;
        if (type === 'reset') {
            this.setData({
                service: '',
                popup: {
                    ...this.data.popup,
                    value: ['0', []],
                    selected: [],
                    selectedCategory: []
                }
            });
        }
        if (type === 'add') {
            this.setData({
                service: this.data.popup.selectedCategory.join(','),
                popup: {
                    ...this.data.popup,
                    visible: false
                }
            });
        }
    }
});
