export const SOCKET_IO_EXTRA_HEADERS /* - */ = process.env.SOCKET_IO_EXTRA_HEADERS /* - */ || 'lrzvu5v6nlc9nuwjz' // alphanumeric only (cannot contain other chars)
// export const KEY /* ------------------ */ = process.env.REACT_KEY /* --------------- */ || 'lRZVu5v6nlc9NUwjk'
export const JWT_KEY /* ----------------- */ = process.env.REACT_JWT_KEY /* ----------- */ || 'CendolD4w3t!?!Z'
export const API_URL /* ----------------- */ = process.env.REACT_API_URL /* ----------- */ || 'https://api.alinagroup.agency'
export const MY_URL /* ------------------ */ = process.env.REACT_MY_URL /* ------------ */ || 'https://alinagroup.agency/cs'
export const NOTIF_SOUND_PATH /* -------- */ = process.env.REACT_NOTIF_SOUND_PATH /* -- */ || './tarik_sis.mp3'
export const FIRST_DATE /* -------------- */ = process.env.REACT_FIRST_DATE /* -------- */ || '2020-10-13T00:00:00+07:00'

const extraHeaders = {}
extraHeaders[SOCKET_IO_EXTRA_HEADERS] = SOCKET_IO_EXTRA_HEADERS

export const SOCKET_IO_OPTIONS = {
  withCredentials: true,
  extraHeaders: { lrzvu5v6nlc9nuwz: 'lrzvu5v6nlc9nuwz' }
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
