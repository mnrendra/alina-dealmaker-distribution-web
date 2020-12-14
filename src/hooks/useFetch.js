import { useEffect, useState } from 'react'

import { FETCH_IO_OPTIONS } from '../config'

const useFetch = (url, opts = {}) => {
  const [data, setData] = useState({})
  const [error, setError] = useState(null)
  const [fetching, setFetching] = useState(false)

  const [method, setMethod] = useState('')
  const [query, setQuery] = useState('')
  const [body, setBody] = useState({})

  const OPTIONS = JSON.stringify(FETCH_IO_OPTIONS)
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
          setData(json)
          setFetching(false)
        })
        .catch(e => setError(e))
    }
  }, [url, OPTIONS, options, method, query, bodyStr, fetching])

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
      error,
      fetching
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
