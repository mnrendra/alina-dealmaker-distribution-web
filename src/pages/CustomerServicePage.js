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

  // fetch
  useEffect(() => {
    if (user._id) {
      setLoading(true)
      fetch(API_URL + '/lead?dealmaker=' + user._id + '&time=' + new Date('2020-12-15').getTime())
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
  }, [setLeads, user])

  // new lead
  useEffect(() => {
    const allleads = newLead && newLead._id ? [newLead, ...leads] : leads
    setAllLeads(allleads)
  }, [setAllLeads, leads, newLead])

  // render

  // render content
  const renderContent = (error = {}, loading = false, leads = [], date = new Date()) => {
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
      {renderContent(error, loading, allLeads, date)}
    </div>
  )
}

export default CustomerServicePage
