//  工具类函数
import Message from 'tdesign-miniprogram/message';

const testText = 'xxxx';

function firstFetch(cb) {
    return testText;
}

// 侧边栏数据转树状菜单数据
function formatTreeSelectOptions(data) {
    const ret = data.map((element, index) => {
        let {items, label} = element;
        items = items.map((ele, idx) => ({
            label: ele.label,
            key: ele.key,
            value: index + '-' + idx
        }));
        return {
            label,
            value: index,
            children: items
        };
    });
    return ret;
}

// 侧边栏数据转checkbox多选菜单
function formatCheckBoxOptions(data) {
    const ret = [];
    data.map((element, index) => {
        let {items} = element;
        items = items.map((ele, idx) => ({
            label: ele.label,
            value: ele.key
        }));
        ret.push(...items);
    });
    return ret;
}

function showMessage(type, context, msg) {
    const data = {
        context,
        offset: [20, 32],
        duration: 3000,
        content: msg
    }
    if (type === 'success') {
        Message.success(data);
    }
    if (type === 'error') {
        Message.error(data);
    }
}

module.exports = {
    formatTreeSelectOptions,
    formatCheckBoxOptions,
    showMessage
};
  