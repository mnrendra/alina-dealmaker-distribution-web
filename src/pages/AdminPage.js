import { useState, useEffect } from 'react'

import { API_URL } from '../config'

// import { useFetch } from '../hooks'

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
    fetch(API_URL + '/lead?time=' + new Date('2020-12-15').getTime())
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
  }, [setAllLeads])

  useEffect(() => {
    const leads = allLeads.filter((lead = {}) => {
      if (currentTab === 'all') return lead
      else if (lead.customerService && currentTab === lead.customerService._id) return lead
      else return false
    })

    setLeads(leads)
  }, [setLeads, currentTab, allLeads])

  const handleChangeTab = csId => {
    setCurrentTab(csId)
  }

  const renderContent = (error = {}, loading = false, currentTab = 'all', dealMakers = [], leads = [], date = new Date()) => {
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
            allLeads={allLeads}
            onChange={handleChangeTab}
          />
          <ListLeads
            leads={leads}
            date={date}
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
      {renderContent(error, loading, currentTab, dealMakers, leads, date)}
    </div>
  )
}

export default AdminPage
