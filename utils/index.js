//  工具类函数
import Message from 'tdesign-miniprogram/message';

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

function getDateStr() {
    const current = new Date();
    const date = current.toISOString().substr(0, 10);
    const time = current.toLocaleString().slice(-8);
    return date + ' ' + time;
}

// 选择的服务keys map到中文名
function mapKeysToLabel(list, keys) {
    const ret = [];
    list.forEach(ele => {
        if (keys.includes(ele.value)) {
            ret.push(ele.label);
        }
    });
    return ret;
}

module.exports = {
    formatTreeSelectOptions,
    formatCheckBoxOptions,
    showMessage,
    getDateStr,
    mapKeysToLabel
};
  