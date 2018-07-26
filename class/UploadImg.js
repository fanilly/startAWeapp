/**
 * 小程序图片上传类
 */
const app = getApp();
export default class UploadImg {
  /**
   * [constructor description]
   * @param  {[Array]} files [chooseImg选中的tempFilePaths]
   * @param  {[Object]} json  [success每上传成功一张调用 complete全部上传完成调用]
   * @return {[void]}       [description]
   */
  constructor(files, json) {
    if (!Array.isArray(files)) {
      throw new Error('Class UploadImg parameter must be an array');
    }
    this.data = [];
    this.fn = json.success;
    this.complete = json.complete;
    this.files = files;
    this.fileLen = this.files.length;
    this.curIndex = 0;
    wx.showLoading({
      title: '上传中'
    });
    this.upload();
  }

  upload() {
    wx.uploadFile({
      url: app.globalData.host + '5b0bee5c49e21',
      filePath: this.files[this.curIndex],
      name: 'file',
      formData: { 'user_id': app.globalData.userid },
      header: { "Content-Type": "multipart/form-data" },
      success: res => {
        let data = JSON.parse(res.data);
        console.log(data);
        if (data.code) {
          this.data.push({
            id: data.data.id / 1,
            path: data.data.path
          });
          this.fn(this.data);
        } else {
          wx.showToast({
            title: '图片上传失败，请重试',
            icon: 'none',
            duration: 2000
          })
        }
      },
      complete: () => {
        this.curIndex++; //这个图片执行完上传后，开始上传下一张
        if (this.curIndex == this.fileLen) { //当图片传完时，停止调用
          this.complete(this.data);
          wx.hideLoading();
          wx.showToast({
            title: '图片上传成功',
            icon: 'success',
            duration: 2000
          })
          wx.hideLoading()
        } else { //若图片还没有传完，则继续调用函数
          this.upload();
        }
      }
    });
  }
}
