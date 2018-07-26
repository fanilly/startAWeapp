const app = getApp()
const { regeneratorRuntime } = global;

import PageToBaseList from '../../class/PageToBaseList.js';
import Mock from '../../utils/mock-min.js';

import { getAuthor, setAuthor } from '../../apis/cache.js';

Page({
  data: {

  },

  async onLoad() {


    // new PageToBaseList(this, {
    //   hash: '5b49ae292625a'
    // }).setPostData({
    //   user_id: app.globalData.userid
    // }).render();

    let data = Mock.mock({
      'list|1-10': [{
        'id|+1': 1
      }]
    });

    console.log(data)

  },

  sleep(s) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('promise resolved')
      }, s * 1000)
    })
  }

})
