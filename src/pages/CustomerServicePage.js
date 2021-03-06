import { useEffect, useState } from 'react'

import { API_URL, MY_URL, NOTIF_SOUND_PATH } from '../config'

import { useNotification } from '../utils'

import { Header, ListLeads } from '../components'

import './CustomerServicePage.css'

const CustomerServicePage = ({ user, socket }) => {
  // states
  const [newLead, setNewLead] = useState({})
  const [leads, setLeads] = useState([])
  const [allLeads, setAllLeads] = useState({})
  const [error, setError] = useState({})
  const [loading, setLoading] = useState(false)
  const [date, setDate] = useState(new Date())
  const [filterDate, setFilterDate] = useState(new Date())

  // hooks
  const [showNotification] = useNotification({ soundURL: NOTIF_SOUND_PATH, onClickURL: MY_URL })

  // notification
  useEffect(() => {
    if (newLead.name && newLead.phone) {
      const message = `New Lead! ${newLead.name} ${newLead.phone}`
      showNotification(message)
    }
  }, [showNotification, newLead])

  // socket
  useEffect(() => {
    if (socket && socket.on && socket.emit && user._id) {
      socket.emit('join', { type: 'dealMaker', userIds: [user._id] })

      socket.on('new-leads', (data = {}) => {
        setNewLead(data)
      })
    }

    return () => {
      setNewLead({})
    }
  }, [socket, user])

  //
  useEffect(() => {
    const currentTime /* - */ = new Date().getTime()
    const today00mmss /* - */ = currentTime - (1000 * 60 * 60 * new Date(currentTime).getHours())
    const today0000ss /* - */ = today00mmss - (1000 * 60 * new Date(today00mmss).getMinutes())
    const today000000 /* - */ = today0000ss - (1000 * new Date(today0000ss).getSeconds())
    const today /* ------- */ = today000000 - new Date(today000000).getMilliseconds()

    setFilterDate(new Date(today))
  }, [setFilterDate])

  // fetch
  useEffect(() => {
    if (user._id) {
      setLoading(true)
      fetch(API_URL + '/lead?dealmaker=' + user._id + '&time=' + filterDate.getTime())
        .then(res => res.json())
        .then(json => {
          if (json.error) {
            setLeads([])
            setError({ message: json.error.message })
          } else if (json.rows) {
            setError({})
            setDate(new Date(json.date))
            setLeads(json.rows)
          } else {
            console.log('Error', json)
          }
          setLoading(false)
        })
    }
  }, [setLeads, user, filterDate])

  // new lead
  useEffect(() => {
    const allleads = newLead && newLead._id ? [newLead, ...leads] : leads
    setAllLeads(allleads)
  }, [setAllLeads, leads, newLead])

  // handle

  const handleFilterDate = date => {
    if (date) {
      if (typeof date === 'string') setFilterDate(new Date(date))
      else if (typeof date.getTime === 'function') setFilterDate(date)
      else setFilterDate(new Date())
    } else {
      setFilterDate(new Date())
    }
  }

  // render

  // render content
  const renderContent = (user = {}, error = {}, loading = false, leads = [], date = new Date(), handleFilterDate = () => {}) => {
    if (error.message) {
      return (<div style={{ margin: '100px auto' }}>{error.message}</div>)
    } else if (loading) {
      return (<div style={{ margin: '100px auto' }}>Loading...</div>)
    } else {
      return (
        <>
          <ListLeads
            leads={leads}
            date={date}
            user={user}
            onChangeDate={handleFilterDate}
          />
        </>
      )
    }
  }

  // return
  return (
    <div className='CustomerServicePage'>
      <Header
        user={user}
      />
      {renderContent(user, error, loading, allLeads, date, handleFilterDate)}
    </div>
  )
}

export default CustomerServicePage
