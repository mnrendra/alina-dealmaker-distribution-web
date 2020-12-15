const useNotification = ({ soundURL, onClickURL, onShow, onClick }) => {
  const showNotification = (msg = '') => {
    const notification = new Notification(msg)
    // on show
    notification.onshow = (e) => {
      e.preventDefault()
      // play sound
      if (typeof soundURL === 'string' && soundURL.slice(soundURL.length - 4, soundURL.length) === '.mp3') {
        const audio = new Audio(soundURL)
        const playedPromise = audio.play()
        if (playedPromise) {
          playedPromise.catch((e) => {
            console.log(e)
            if (e.name === 'NotAllowedError' || e.name === 'NotSupportedError') {
              console.log(e.name)
            }
          }).then((a, b, c) => {
            console.log('playing sound !!!', { a, b, c })
          })
        }
      }
      // execute onShow props
      if (typeof onShow === 'function') {
        onShow(e)
      }
    }

    // on click
    notification.onclick = (e) => {
      e.preventDefault()
      // execute onClick props
      if (typeof onClick === 'function') {
        onClick(e)
      }
      // open _self window
      if (typeof onClickURL === 'string' && (onClickURL.includes('http://') || onClickURL.includes('https://'))) {
        window.open(onClickURL, '_self')
      }
    }
  }

  const handleNotification = (message = '') => {
    if (!Notification || !('Notification' in window)) alert('This browser does not support desktop notification')
    else if (Notification.permission === 'granted') showNotification(message)
    else if (Notification.permission !== 'denied') {
      Notification.requestPermission().then(permission => {
        permission === 'granted' && showNotification(message)
      })
    }
  }

  return [handleNotification]
}

export default useNotification
