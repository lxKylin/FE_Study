// 本地缓存
class LocalCache {
  // 设置缓存
  setCache(key: string, value: any) {
    // setItem设置键值对，value一定是string，使用JSON.stringify转化
    window.localStorage.setItem(key, JSON.stringify(value))
  }

  // 获取缓存数据
  getCache(key: string) {
    // obj => string => obj
    const value = window.localStorage.getItem(key)
    // 判断是否有值
    if (value) {
      // JSON.parse将string转化为原来的类型
      return JSON.parse(value)
    }
  }

  // 删除某个缓存
  deleteCache(key: string) {
    window.localStorage.removeItem(key)
  }

  // 清空缓存
  clearCache() {
    window.localStorage.clear()
  }
}

export default new LocalCache()
