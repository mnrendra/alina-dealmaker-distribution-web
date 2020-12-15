import { useEffect, useState } from 'react'

import { API_URL } from '../config'

import { useFetch } from '../hooks'

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

  const [leadResponse, { doGet }] = useFetch(API_URL + '/lead?dealmaker=' + user._id)

  const userStr = JSON.stringify(user || {})
  const leadResponseStr = JSON.stringify(leadResponse || {})
  const leadsStr = JSON.stringify(leads)
  const newLeadStr = JSON.stringify(newLead)

  useEffect(() => {
    doGet()
  }, [doGet])

  useEffect(() => {
    const { error, fetching, data } = JSON.parse(leadResponseStr)
    const userObj = JSON.parse(userStr)

    if (error && error.message) setError({ message: error.message })
    else if (fetching) setLoading(true)
    else if (data && data.rows && Array.isArray(data.rows)) {
      const thisLeads = data.rows.filter((lead = {}) => {
        return lead.customerService && lead.customerService._id === userObj._id ? lead : false
      })
      setLeads(thisLeads)
    } else {
      console.log('error', JSON.parse(leadResponseStr))
      setError({ message: 'error' })
    }
  }, [leadResponseStr, userStr])

  useEffect(() => {
    const userObj = JSON.parse(userStr)

    if (socket && socket.emit && userObj._id) {
      const userIds = [userObj._id]
      socket.emit('join', { type: 'dealMaker', userIds })
    }
  }, [socket, userStr])

  useEffect(() => {
    if (socket && socket.on) {
      socket.on('new-leads', (data = {}) => {
        setNewLead(data)
      })
    }
  }, [socket])

  useEffect(() => {
    const leads = JSON.parse(leadsStr)
    const newLead = JSON.parse(newLeadStr)

    const allLeads = newLead._id ? leads.push(newLead) : leads
    setAllLeads(allLeads)
  }, [leadsStr, newLeadStr])

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
