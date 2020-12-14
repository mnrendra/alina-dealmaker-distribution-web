import { useEffect, useState } from 'react'

import { API_URL } from '../config'

import { useFetch } from '../hooks'

import Header from '../components/Header'
import ListLeads from '../components/ListLeads'

import './CustomerServicePage.css'

const CustomerServicePage = ({ user, socket }) => {
  const userStr = JSON.stringify(user || {})

  const [leads, setLeads] = useState([])
  const [newLead, setNewLead] = useState({})
  const [allLeads, setAllLeads] = useState({})

  const [leadResponse, { doGet }] = useFetch(API_URL + '/lead?dealmaker=' + user._id)

  useEffect(() => {
    doGet()
  }, [doGet])

  useEffect(() => {
    const { error, data } = leadResponse
    const userObj = JSON.parse(userStr)

    if (error) {
      console.log('error', error)
    } else if (data && data.rows) {
      const thisLeads = data.rows.filter(lead => {
        return lead.customerService._id === userObj._id && leads
      })
      setLeads(thisLeads)
    }
  }, [leadResponse, userStr, leads])

  useEffect(() => {
    const userObj = JSON.parse(userStr)

    if (socket && userObj._id) {
      const userIds = [userObj._id]
      socket.emit('join', { type: 'dealMaker', userIds })
    }
  }, [socket, userStr])

  useEffect(() => {
    if (socket) {
      socket.on('new-leads', data => {
        setNewLead(data)
      })
    }
  }, [socket])

  useEffect(() => {
    const allLeads = newLead._id ? leads.push(newLead) : leads
    setAllLeads(allLeads)
  }, [leads, newLead])

  return (
    <div className='CustomerServicePage'>
      <Header
        user={user}
      />
      <ListLeads
        user={user}
        leads={allLeads}
      />
    </div>
  )
}

export default CustomerServicePage
