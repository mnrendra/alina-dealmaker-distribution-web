import { useEffect, useState } from 'react'
import socketIO from 'socket.io-client'

const useSocket = (url, opt) => {
  const options = JSON.stringify(opt || {})

  const [socket, setSocket] = useState(null)
  const [socketId, setSocketId] = useState('')

  useEffect(() => {
    if (url) {
      const io = socketIO(url, JSON.parse(options))
      setSocket(io)
    }

    return () => setSocket(null)
  }, [url, options])

  useEffect(() => {
    if (socket) {
      socket.on('connect', () => {
        setSocketId(socket.id)
      })
    }

    return () => setSocketId('')
  }, [socket])

  return socketId ? [socket] : [null]
}

export default useSocket
