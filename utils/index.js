//  工具类函数
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

module.exports = {
    firstFetch,
    formatTreeSelectOptions
};
  