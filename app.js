//app.js

global.regeneratorRuntime = require('./librarys/regenerator/runtime-module');
global.version = 'v:1.0.0';

const { regeneratorRuntime } = global;

import { get } from './apis/fetch.js';

App({

  login() {
    return new Promise((resolve, reject) => {
      wx.login({
        success: res => {
          if (res.code) {
            get('5a6c649502ee0', {
              code: res.code
            }).then(res => {
              let resData = res.data.data;
              this.globalData.userInfo = resData;
              this.globalData.userid = resData.id;
              resolve(resData);
            });
          } else {
            //console.log('登录失败！' + res.errMsg)
          }
        }
      });
    });
  },

  onLaunch: function() {

  },

  globalData: {
    userid: '',
    userInfo: null,
    host: '',
  }

});
