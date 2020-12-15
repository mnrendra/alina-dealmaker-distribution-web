import { useState, useEffect } from 'react'

import { API_URL } from '../config'

// import { useFetch } from '../hooks'

import {
  Header,
  Tab,
  ListLeads
} from '../components'

import './AdminPage.css'

const AdminPage = ({ user, socket }) => {
  const [currentTab, setCurrentTab] = useState('all')
  const [error, setError] = useState({})
  const [loading, setLoading] = useState(false)
  const [dealMakers, setDealMakers] = useState([])
  const [allLeads, setAllLeads] = useState([])
  const [leads, setLeads] = useState([])

  const handleFetch = (url = API_URL, setState = () => {}) => {
    setLoading(true)
    fetch(url)
      .then(res => res.json())
      .then(json => {
        console.log(url, json)
        if (json.error) {
          setState([])
          setError({ message: json.error.message })
        } else if (json.rows) {
          setError({})
          setState(json.rows)
        } else {
          console.log('HALU')
        }
        setLoading(false)
      })
  }

  const handleChangeTab = csId => {
    setCurrentTab(csId)
  }

  useEffect(() => {
    handleFetch(API_URL + '/customer-service', setDealMakers)
  }, [])

  useEffect(() => {
    handleFetch(API_URL + '/lead', setAllLeads)
  }, [])

  useEffect(() => {
    const leads = allLeads.filter((lead = {}) => {
      if (currentTab === 'all') return lead
      else if (lead.customerService && currentTab === lead.customerService._id) return lead
      else return false
    })

    setLeads(leads)
  }, [currentTab, allLeads])

  const renderContent = (currentTab = 'all', error = {}, loading = false, dealMakers = [], leads = []) => {
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
            leads={leads}
            onChange={handleChangeTab}
          />
          <ListLeads
            leads={leads}
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
      {renderContent(currentTab, error, loading, dealMakers, leads)}
    </div>
  )
}

export default AdminPage
