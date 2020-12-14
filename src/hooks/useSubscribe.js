import { useEffect, useState } from 'react'

const useSubscribe = (socket) => {
  const [event, setEvent] = useState('')
  const [notif, setNotif] = useState(null)

  useEffect(() => {
    if (socket && event) {
      console.log('uuuu', event)
      socket.on(event, data => {
        console.log('asss', data)
        setNotif(data)
      })
    }

    return () => socket ? socket.off(event) : false
  }, [socket, event, setNotif])

  const doListen = (e = '') => setEvent(e)

  return [notif, doListen]
}

export default useSubscribe
