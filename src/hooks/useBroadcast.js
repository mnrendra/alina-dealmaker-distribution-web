import { useState } from 'react'

const useBroadcast = (socket) => {
  const [emit, setEmit] = useState({ event: '', data: {} })

  console.log('useEffect', { emit })

  // useEffect(() => {
  //   const emitObj = JSON.parse(emitStr)

  //   console.log('useEffect', { emitObj })

  //   // if (socket && emitObj.event && emitObj.data) {
  //   //   socket.emit(emitObj.event, emitObj.data)
  //   // }

  //   // return () => setEmit({ event: '', data: {} })
  // }, [emitStr])

  const doEmit = (event = '', data = {}) => {
    setEmit({ event, data })
  }

  return [doEmit]
}

export default useBroadcast
