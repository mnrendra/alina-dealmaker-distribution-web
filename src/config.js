export const KEY = process.env.REACT_KEY || 'lRZVu5v6nlc9NUwj'

export const JWT_KEY = process.env.REACT_JWT_KEY || 'CendolD4w3t!'

// export const API_URL = process.env.REACT_API_URL || 'http://192.168.18.92:3001'
export const API_URL = process.env.REACT_API_URL || 'http://localhost:3001'

export const MY_URL = process.env.REACT_MY_URL || 'http://localhost:3000'

export const NOTIF_SOUND_PATH = process.env.REACT_NOTIF_SOUND_PATH || './tarik_sis.mp3'

const extraHeaders = {}
extraHeaders[KEY] = KEY

export const SOCKET_IO_OPTIONS = {
  withCredentials: true,
  extraHeaders: extraHeaders
}

export const FETCH_OPTIONS = {
  method: 'GET', // *GET, POST, PUT, DELETE, etc.
  mode: 'cors', // no-cors, *cors, same-origin
  cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
  credentials: 'same-origin', // include, *same-origin, omit
  headers: {
    'Content-Type': 'application/json'
    // 'Content-Type': 'application/x-www-form-urlencoded',
  },
  redirect: 'follow', // manual, *follow, error
  referrerPolicy: 'no-referrer' // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
}
