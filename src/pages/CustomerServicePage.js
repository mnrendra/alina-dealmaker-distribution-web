import { useEffect, useState } from 'react'

import { API_URL } from '../config'

// import { useFetch } from '../hooks'

import {
  Header,
  ListLeads
} from '../components'

import './CustomerServicePage.css'

const CustomerServicePage = ({ user, socket }) => {
  const [leads, setLeads] = useState([])
  const [newLead, setNewLead] = useState({})
  const [allLeads, setAllLeads] = useState({})
  const [error, setError] = useState({})
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (socket && socket.on && socket.emit) {
      socket.emit('join', { type: 'dealMaker', userIds: [user._id] })

      socket.on('new-leads', (data = {}) => {
        setNewLead(data)
      })
    }
  }, [socket, user])

  const handleFetch = (url = API_URL, setState = () => {}) => {
    setLoading(true)
    fetch(url)
      .then(res => res.json())
      .then(json => {
        if (json.error) {
          setState([])
          setError({ message: json.error.message })
        } else if (json.rows) {
          setError({})
          setState(json.rows)
        } else {
          console.log('error', json)
        }
        setLoading(false)
      })
  }

  useEffect(() => {
    handleFetch(API_URL + '/lead?dealmaker=' + user._id + '&time=' + new Date('2020-12-12').getTime(), setLeads)
  }, [user])

  useEffect(() => {
    const allLeads = newLead && newLead._id ? [newLead, ...leads] : leads
    setAllLeads(allLeads)
  }, [leads, newLead])

  const renderContent = (error = {}, loading = false, leads = []) => {
    if (error.message) {
      return (<div style={{ margin: '100px auto' }}>{error.message}</div>)
    } else if (loading) {
      return (<div style={{ margin: '100px auto' }}>Loading...</div>)
    } else {
      return (
        <>
          <ListLeads
            leads={leads}
          />
        </>
      )
    }
  }

  return (
    <div className='CustomerServicePage'>
      <Header
        user={user}
      />
      {renderContent(error, loading, allLeads)}
    </div>
  )
}

export default CustomerServicePage
