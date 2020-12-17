import { useState, useEffect } from 'react'
import jwt from 'jsonwebtoken'
import Cookies from 'universal-cookie'

// import { API_URL, SOCKET_IO_OPTIONS, JWT_KEY } from './config'
import { API_URL, JWT_KEY } from './config'

import { useSocket } from './hooks'

import {
  AuthPage,
  AdminPage,
  CustomerServicePage
} from './pages/'

import './App.css'

const App = () => {
  const [page, setPage] = useState('')
  const [user, setUser] = useState({})

  // const [socket] = useSocket(API_URL, SOCKET_IO_OPTIONS)
  const [socket] = useSocket(API_URL)

  useEffect(() => {
    const cookies = new Cookies()
    const token = cookies.get('token')
    const decoded = token ? jwt.verify(token, JWT_KEY) : { type: 'auth', data: {} }

    setPage(decoded.type)
    setUser(decoded.data)
  }, [])

  const handleLogging = (token = '') => {
    const decoded = jwt.verify(token, JWT_KEY)
    setPage(decoded.type)
    setUser(decoded.data)

    const cookies = new Cookies()
    cookies.set('token', token, { path: '/' })
  }

  const renderPage = (page, socket) => {
    switch (page) {
      case 'auth':
        return (
          <AuthPage
            onLogged={handleLogging}
          />
        )
      case 'admin':
        return (
          <AdminPage
            user={user}
            socket={socket}
          />
        )
      case 'customerService':
        return (
          <CustomerServicePage
            user={user}
            socket={socket}
          />
        )
      default:
        return (<div style={{ margin: '100px auto' }}>Loading...</div>)
    }
  }

  return (
    <div className='App'>
      {renderPage(page, socket)}
    </div>
  )
}

export default App
