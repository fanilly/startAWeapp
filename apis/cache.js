const CACHE_TIME = 86400000

const setOp = (key, data) => {
  try {
    wx.setStorageSync(key, {
      t: (+new Date()),
      d: data
    })
  } catch (e) {}
}

const getOp = (key) => {
  const data = wx.getStorageSync(key) || null
  console.log(data)

  if (data) {
    const tstamp = data.t
    const offset = (+new Date()) - tstamp

    if (offset <= CACHE_TIME) {
      return data.d
    }
  }

  return null
}

export const setAuthor = (id, val) => (
  setOp(`_atr_${id}`, val)
);

export const getAuthor = id => (
  getOp(`_atr_${id}`)
);
