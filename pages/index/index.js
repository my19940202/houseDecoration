// index.js
// const app = getApp()
Page({
    data: {
        imageList: [
            'https://bj.bcebos.com/v1/aop-data-app-test/assets/imgs/poster1.jpg',
            'https://bj.bcebos.com/v1/aop-data-app-test/assets/imgs/poster2.jpg',
            'https://bj.bcebos.com/v1/aop-data-app-test/assets/imgs/poster3.jpg'
        ],
        daySinceLove: (Math.round((new Date() - new Date('2018-12-10'))) / 1000 / 3600 / 24).toFixed()
    },
    onLoad() {
        console.log('this is onload');
    }
});
