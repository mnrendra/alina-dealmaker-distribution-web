import { useEffect, useState } from 'react'

const useNotification = ({ soundURL, onClickURL }) => {
  const [message, setMessage] = useState('')
  const [onShow, setOnShow] = useState(() => {})
  const [onClick, setOnClick] = useState(() => {})
  const [error, setError] = useState(null)
  const [sounding, setSounding] = useState(false)

  useEffect(() => {
    if (sounding) {
      try {
        const audio = new Audio(soundURL)
        audio.play()
      } catch (e) {
        setError(e)
      }
    }
    //
  }, [sounding, soundURL])

  useEffect(() => {
    const showNotification = (msg = '') => {
      const notification = new Notification(msg)
      // on show
      notification.onshow = (e) => {
        e.preventDefault()
        // play sound
        if (typeof soundURL === 'string' && soundURL.slice(soundURL.length - 4, soundURL.length) === '.mp3') {
          setSounding(true)
        }
        // execute onShow props
        if (typeof onShow === 'function') {
          setOnShow(onShow(e))
        }
      }

      // on click
      notification.onclick = (e) => {
        e.preventDefault()
        // open _self url
        if (typeof onClickURL === 'string' && (onClickURL.includes('http://') || onClickURL.includes('https://'))) {
          window.open(onClickURL, '_self')
        }
        // execute onShow props
        if (typeof onClick === 'function') {
          setOnClick(onClick(e))
        }
      }
    }

    if (!Notification || !('Notification' in window)) alert('This browser does not support desktop notification')
    else if (Notification.permission === 'granted') showNotification(message)
    else if (Notification.permission !== 'denied') {
      Notification.requestPermission().then(permission => {
        permission === 'granted' && showNotification(message)
      })
    }

    return () => setSounding(false)
  }, [message, soundURL, onClickURL, onShow, onClick])

  return [setMessage, { onShow, onClick }, error]
}

export default useNotification
