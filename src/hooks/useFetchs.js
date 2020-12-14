import { useEffect, useState } from 'react'

const OPTS = {
  method: 'GET', // *GET, POST, PUT, DELETE, etc.
  mode: 'cors', // no-cors, *cors, same-origin
  cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
  credentials: 'same-origin', // include, *same-origin, omit
  headers: {
    'Content-Type': 'application/json'
    // 'Content-Type': 'application/x-www-form-urlencoded',
  },
  redirect: 'follow', // manual, *follow, error
  referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
}

const useFetch = (url, opts = {}) => {
  const options = JSON.stringify(opts)
  const OPTIONS = JSON.stringify(OPTS)
  //
  const [data, setData] = useState({})
  const [error, setError] = useState(null)
  //
  const [method, setMethod] = useState('')
  const [query, setQuery] = useState('')
  const [body, setBody] = useState({})
  //
  const [fetching, setFetching] = useState(false)

  useEffect(() => {
    const opt = { ...JSON.parse(OPTIONS), ...JSON.parse(options) }
    opt.method = method || 'GET'

    if (opt.method === 'POST' || opt.method === 'PUT') {
      opt.body = JSON.stringify(body)
    }
    //
    if (fetching) {
      fetch(url, opt)
        .then(res => res.json())
        .then(json => {
          setData(json)
          setFetching(false)
        })
        .catch(e => setError(e))
    }
  }, [url, OPTIONS, options, method, query, body, fetching])

  const doGet = (query = '') => {
    setQuery(query)
    setMethod('GET')
    setFetching(true)
  }

  const doPost = (body = {}) => {
    setBody(body)
    setMethod('POST')
    setFetching(true)
  }

  const doPut = (query = '', body = {}) => {
    setQuery(query)
    setBody(body)
    setMethod('PUT')
    setFetching(true)
  }

  const doDelete = (query = '') => {
    setQuery(query)
    setMethod('DELETE')
    setFetching(true)
  }

  return [
    {
      data,
      fetching,
      error
    },
    {
      doGet,
      doPost,
      doPut,
      doDelete
    }
  ]
}

export default useFetch
