// export
const app = getApp();
export const get = (hash, data = {}) => {
    return new Promise((resolve, reject) => {
        wx.request({
            data,
            url: app.globalData.host + hash,
            method: 'GET',
            success: res => {
                if (res.data.code == 1) {
                    console.log(res);
                    resolve(res);
                } else {
                    wx.showToast({
                        title: res.data.info,
                        icon: 'none',
                        duration: 1200
                    })
                    reject(res);
                }
            }
        });
    });
};

export const post = (hash, data = {}) => {
    return new Promise((resolve, reject) => {
        wx.request({
            data,
            url: app.globalData.host + hash,
            method: 'POST',
            success: res => {
                if (res.data.code == 1) {
                    console.log(res);
                    resolve(res);
                } else {
                    wx.showToast({
                        title: res.data.info,
                        icon: 'none',
                        duration: 1200
                    })
                    reject(res);
                }
            }
        });
    });
};
