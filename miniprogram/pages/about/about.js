const db = wx.cloud.database()
Page({
  data: {
    hitokoto_url: '',
    edit_show: '话不投机半句多'
  },
  onLoad: function (options) {
    var that = this
    db.collection('url').doc('hitokoto').get().then(res => {
      that.setData({
        hitokoto_url:  res.data.url
      })
    })
    setInterval(() => {
      wx.request({
        url: that.data.hitokoto_url,
        header: {
          'content-type': 'application/json' // 默认值
        },
        success(res) {
          that.setData({
            edit_show: res.data.hitokoto
          })
        }
      })
    }, 3000)
  },

  copyIt: function (e) {
    const data = e.currentTarget.dataset.text
    if (data) {
      wx.setClipboardData({
        data: e.currentTarget.dataset.text,
        success(res) {
          wx.showToast({
            title: '内容已复制！'
          })
        }
      })
    }
  },
  author: function () {
    wx.navigateTo({
      url: '../author/author'
    })
  },
  feedback: function () {
    wx.navigateToMiniProgram({
      appId: 'wx8abaf00ee8c3202e',
      extraData: {
        id: '308396'
      },
      fail: err => {
        console.log(err)
      }
    })
  },
})