import storage from './storage'

const TOKEN_KEY = 'HEIMA_TT_TOKE'

export const setToken = (token) => storage.set(TOKEN_KEY, token)

export const getToken = () => storage.get(TOKEN_KEY)

export const removeToken = () => storage.remove(TOKEN_KEY)
