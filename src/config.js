export const KEY = 'lRZVu5v6nlc9NUwj'

export const JWT_KEY = 'CendolD4w3t!'

// export const API_URL = 'http://192.168.18.92:3001'

export const API_URL = 'http://localhost:3001'

export const SOCKET_IO_OPTIONS = {
  withCredentials: true,
  extraHeaders: {
    lRZVu5v6nlc9NUwj: 'lRZVu5v6nlc9NUwj'
  }
}

export const FETCH_IO_OPTIONS = {
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
