/**
 * @Author:      allenAugustine
 * @Email:       iallenaugustine@gmail.com  -  misterji0708@qq.com
 * @DateTime:    2018-07-24 15:11:13
 * @Description: 将页面类型转化为列表类
 */

const app = getApp();

export default class PageToBaseList {

  constructor(page, options) {
    this.page = page;
    this.hash = options.hash || options;
    this.method = options.method || 'GET';
    this.header = options.header || { 'Content-Type': 'application/json' };
    this.curPage = 1;
    this.page.onReachBottom = this.onReachBottom;
  }

  render() {
    if (this.addFn) this.addFn();
    this.getLists();
  }

  setPostData(data) {
    this.postData = {
      ...data,
      page: this.curPage
    }
    return this;
  }

  getLists() {
    return new Promise((resolve, reject) => {
      wx.request({
        url: app.globalData.host + this.hash,
        data: this.postData,
        method: this.method,
        header: this.header,
        success: res => {
          console.log(res)
          if (res.data.code == 1) {
            let resData = res.data.data,
              lists = this.page.data.lists || [];
            if (resData.length < 20) this.page.setData({ listLoadedAll: true });
            if (resData.length == 0 && lists.length == 0) this.page.setData({ listNoData: true });
            lists.push(...resData);
            this.page.setData({ lists, listLoaded: true });
            this.curPage++;
          }
        },
        fail(err) {
          console.log(err);
        }
      })
    })
  }

  onReachBottom() {
    if (this.page.data.listNoData || this.page.data.listLoadedAll) return;
    this.getLists();
  }
}
