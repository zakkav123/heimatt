class Storage {
  set(key, val) {
    if (typeof val === 'object') {
      val = JSON.stringify(val)
    }
    localStorage.setItem(key, val)
  }

  get(key) {
    const value = localStorage.getItem(key)
    try {
      return JSON.parse(value)
    } catch {
      return value
    }
  }

  remove(item) {
    localStorage.removeItem(item)
  }
}

const storage = new Storage()
export default storage
