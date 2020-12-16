import { useEffect, useState } from 'react'

import { FETCH_OPTIONS } from '../config'

const useFetch = (url, opts = {}) => {
  // const [data, setData] = useState({})
  // const [error, setError] = useState(null)
  // const [loading, setLoading] = useState(false)

  const [response, setResponse] = useState({ error: {}, fetching: false, data: {} })

  const [method, setMethod] = useState('')
  const [query, setQuery] = useState('')
  const [body, setBody] = useState({})

  const [fetching, setFetching] = useState(false)

  const OPTIONS = JSON.stringify(FETCH_OPTIONS)
  const options = JSON.stringify(opts)
  const bodyStr = JSON.stringify(body)

  useEffect(() => {
    const opt = { ...JSON.parse(OPTIONS), ...JSON.parse(options) }

    opt.method = method || 'GET'

    if ((opt.method === 'POST' || opt.method === 'PUT') && bodyStr) {
      opt.body = bodyStr
    }

    if (fetching) {
      fetch(query ? url + query : url, opt)
        .then(res => res.json())
        .then(json => {
          console.log('SAPI', json)
          setFetching(false)
          setResponse({ error: {}, fetching: false, data: json })
          // setLoading(false)
          // setData(json)
        })
        .catch(e => {
          console.log('asu', e)
          setResponse({ error: { message: 'unable to fetch' }, fetching: false, data: {} })
        })
    }
  }, [url, OPTIONS, options, method, query, bodyStr, fetching])

  const doGet = (query = '') => {
    setResponse({ error: { message: {} }, fetching: true, data: {} })
    setQuery(query)
    setMethod('GET')
    setFetching(true)
  }

  const doPost = (body = {}) => {
    setResponse({ error: { message: {} }, fetching: true, data: {} })
    setBody(body)
    setMethod('POST')
    setFetching(true)
  }

  const doPut = (query = '', body = {}) => {
    setResponse({ error: { message: {} }, fetching: true, data: {} })
    setQuery(query)
    setBody(body)
    setMethod('PUT')
    setFetching(true)
  }

  const doDelete = (query = '') => {
    setResponse({ error: { message: {} }, fetching: true, data: {} })
    setQuery(query)
    setMethod('DELETE')
    setFetching(true)
  }

  return [
    response,
    {
      doGet,
      doPost,
      doPut,
      doDelete
    }
  ]
}

export default useFetch
