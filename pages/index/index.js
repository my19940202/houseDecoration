// index.js
// const app = getApp()
Page({
    data: {
        imageList: [
            {value: 'https://appleimage.liba.com/o_1guseooc2dg117s61mhi1opo1k46v.jpg-image1.w664h500', ariaLabel: 'XX'},
            {value: 'https://appleimage.liba.com/o_1h1dfrvpjddrd270u49tic319.jpg-image1.w664h500', ariaLabel: 'YY'},
            {value: 'https://appleimage.liba.com/o_1gcgjj3t31o361l7ua4aualj6ig.jpg-image1.w664h500', ariaLabel: 'XX'},
            {value: 'https://appleimage.liba.com/o_1gpmbnda5qi53iv1r7ft7dbef1p.jpg-image1.w664h500', ariaLabel: 'ZZ'},
            {value: 'https://appleimage.liba.com/o_1goo47r6qa3r1ur6a3b5sg1ntu1d.jpg-image1.w664h500', ariaLabel: 'XX'}  
        ],
        daySinceLove: (Math.round((new Date() - new Date('2018-12-10'))) / 1000 / 3600 / 24).toFixed()
    },
    onLoad() {
        console.log('this is onload');
    }
});
