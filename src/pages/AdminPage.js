import { useState, useEffect } from 'react'

import { API_URL, MY_URL, NOTIF_SOUND_PATH } from '../config'

import { useNotification } from '../utils'

import { Header, Tab, ListLeads } from '../components'

import './AdminPage.css'

const AdminPage = ({ user, socket }) => {
  const [currentTab, setCurrentTab] = useState('all')
  const [error, setError] = useState({})
  const [loading, setLoading] = useState(false)
  const [dealMakers, setDealMakers] = useState([])
  const [allLeads, setAllLeads] = useState([])
  const [leads, setLeads] = useState([])
  const [date, setDate] = useState(new Date())
  const [filterDate, setFilterDate] = useState(new Date())
  const [newLead, setNewLead] = useState({})
  const [newLeads, setNewLeads] = useState([])

  const [showNotification] = useNotification({ soundURL: NOTIF_SOUND_PATH, onClickURL: MY_URL })

  useEffect(() => {
    if (newLead.name && newLead.phone) {
      const message = `New Lead! ${newLead.name} ${newLead.phone}`
      showNotification(message)
    }
  }, [showNotification, newLead])

  useEffect(() => {
    const currentTime /* - */ = new Date().getTime()
    const today00mmss /* - */ = currentTime - (1000 * 60 * 60 * new Date(currentTime).getHours())
    const today0000ss /* - */ = today00mmss - (1000 * 60 * new Date(today00mmss).getMinutes())
    const today000000 /* - */ = today0000ss - (1000 * new Date(today0000ss).getSeconds())
    const today /* ------- */ = today000000 - new Date(today000000).getMilliseconds()

    setFilterDate(new Date(today))
  }, [setFilterDate])

  useEffect(() => {
    setLoading(true)
    fetch(API_URL + '/customer-service')
      .then(res => res.json())
      .then(json => {
        if (json.error) {
          setDealMakers([])
          setError({ message: json.error.message })
        } else if (json.rows) {
          setError({})
          setDealMakers(json.rows)
        } else {
          console.log('Error', json)
        }
        setLoading(false)
      })
  }, [setDealMakers])

  useEffect(() => {
    setLoading(true)
    fetch(API_URL + '/lead?time=' + filterDate.getTime())
      .then(res => res.json())
      .then(json => {
        if (json.error) {
          setAllLeads([])
          setError({ message: json.error.message })
        } else if (json.rows) {
          setError({})
          setDate(new Date(json.date))
          setAllLeads(json.rows)
        } else {
          console.log('Error', json)
        }
        setLoading(false)
      })
  }, [setAllLeads, filterDate])

  useEffect(() => {
    if (socket && socket.on && socket.emit && Array.isArray(dealMakers) && dealMakers.length) {
      const userIds = dealMakers.map(({ _id }) => _id)
      socket.emit('join', { type: 'superAdmin', userIds })

      socket.on('new-leads', (data = {}) => {
        setNewLead(data)
      })
    }

    return () => {
      setNewLead({})
    }
  }, [socket, dealMakers])

  useEffect(() => {
    let newleads = []
    if (newLead && newLead._id) {
      newleads = [newLead, ...allLeads]
      setNewLead({})
      setAllLeads(newleads)
    } else {
      newleads = allLeads
    }

    setNewLeads(newleads)
  }, [setNewLeads, setAllLeads, setNewLead, allLeads, newLead])

  useEffect(() => {
    const leads = newLeads.filter((lead = {}) => {
      if (currentTab === 'all') return lead
      else if (lead.customerService && currentTab === lead.customerService._id) return lead
      else return false
    })

    setLeads(leads)
  }, [setLeads, currentTab, newLeads])

  const handleChangeTab = csId => {
    setCurrentTab(csId)
  }

  const handleFilterDate = date => {
    if (date) {
      if (typeof date === 'string') setFilterDate(new Date(date))
      else if (typeof date.getTime === 'function') setFilterDate(date)
      else setFilterDate(new Date())
    } else {
      setFilterDate(new Date())
    }
  }

  const renderContent = (error = {}, loading = false, currentTab = 'all', dealMakers = [], newLeads = [], leads = [], date = new Date(), handleFilterDate = () => {}) => {
    if (error.message) {
      return (<div style={{ margin: '100px auto' }}>{error.message}</div>)
    } else if (loading) {
      return (<div style={{ margin: '100px auto' }}>Loading...</div>)
    } else {
      return (
        <>
          <Tab
            currentTab={currentTab}
            dealMakers={dealMakers}
            allLeads={newLeads}
            onChange={handleChangeTab}
          />
          <ListLeads
            leads={leads}
            date={date}
            onChangeDate={handleFilterDate}
          />
        </>
      )
    }
  }

  return (
    <div className='AdminPage'>
      <Header
        user={user}
      />
      {renderContent(error, loading, currentTab, dealMakers, newLeads, leads, date, handleFilterDate)}
    </div>
  )
}

export default AdminPage
