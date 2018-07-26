/**
 * 小程序视频上传类
 */
const app = getApp();
export default class UploadVideo {
  /**
   * [constructor description]
   * @param  {[Array]} files [chooseVideo选中的tempFilePaths]
   * @param  {[Object]} json  [success上传成功调用]
   * @return {[void]}       [description]
   */
  constructor(file, json) {
    this.fn = json.success;
    this.file = file;
    wx.showLoading({
      title: '上传中'
    });
    this.upload();
  }

  upload() {
    wx.uploadFile({
      url: app.globalData.host + '5b446b0da7d8c',
      filePath: this.file,
      name: 'file',
      formData: { 'user_id': app.globalData.userid },
      header: { "Content-Type": "multipart/form-data" },
      success: res => {
        wx.hideLoading();
        let data = JSON.parse(res.data);
        console.log(data);
        if (data.code == 1) {
          this.fn(data.data);
        } else {
          wx.showToast({
            title: '图片上传失败，请重试',
            icon: 'none',
            duration: 2000
          })
        }
      }
    });
  }
}
