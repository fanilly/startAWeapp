const app = getApp()
const { regeneratorRuntime } = global;

import PageToBaseList from '../../class/PageToBaseList.js';
import Mock from '../../utils/mock-min.js';

import { getAuthor, setAuthor } from '../../apis/cache.js';

Page({
  data: {

  },

  async onLoad() {

    // this.instance = new PageToBaseList(this,{});
    // this.instance.render();

    let mockData = await (() => (
      new Promise(resolve => {
        setTimeout(() => {
          resolve(Mock.mock({
            'list|10': [{
              'id|+1': 1,
              'desc|5-10': '描述文字',
              color: '@color()',
              image: "@image(750x300)",
              name: '@cname()'
            }]
          }).list);
        }, 1500);
      })))();
    console.log(mockData)

  },

  onReachBottom() {
    // this.instance.reachBottom();
  },

  sleep(s) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('promise resolved')
      }, s * 1000)
    })
  }

})
