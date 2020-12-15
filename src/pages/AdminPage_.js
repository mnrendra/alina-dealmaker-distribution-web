import { useState, useEffect } from 'react'

import { API_URL } from '../config'

import { useFetch } from '../hooks'

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

  const [dealMakersRes, dealMakersFetch] = useFetch(API_URL + '/customer-service')
  const [allLeadsRes, allLeadsFetch] = useFetch(API_URL + '/lead')

  const dealmakersResStr = JSON.stringify(dealMakersRes || {})
  const allLeadsResStr = JSON.stringify(allLeadsRes || {})
  const allLeadsStr = JSON.stringify(allLeads)

  useEffect(() => {
    dealMakersFetch.doGet()
    allLeadsFetch.doGet()
  }, [dealMakersFetch, allLeadsFetch])

  useEffect(() => {
    const { error, fetching, data } = JSON.parse(dealmakersResStr)
    console.log(data && data.rows && Array.isArray(data.rows), { error, fetching, data })

    if (error && error.message) {
      console.log('A')
      setError({ message: error.message })
      setLoading(false)
      setDealMakers([])
    } else if (fetching) {
      console.log('B')
      setError({})
      setLoading(true)
      setDealMakers([])
    } else if (data && data.rows && Array.isArray(data.rows)) {
      console.log('C')
      setError({})
      setLoading(false)
      setDealMakers(data.rows)
    } else {
      console.log('D')
      console.log('error', JSON.parse(dealmakersResStr))
      setError({ message: 'error' })
      setLoading(false)
      setDealMakers([])
    }
  }, [dealmakersResStr])

  useEffect(() => {
    const { error, fetching, data } = JSON.parse(allLeadsResStr)

    if (error && error.message) {
      setError({ message: error.message })
      setLoading(false)
      setDealMakers([])
    } else if (fetching) {
      setError({})
      setLoading(true)
      setDealMakers([])
    } else if (data && data.rows && Array.isArray(data.rows)) {
      setError({})
      setLoading(false)
      setAllLeads(data.rows)
    } else {
      console.log('susi', JSON.parse(allLeadsResStr))
      setError({ message: 'error' })
      setLoading(false)
      setDealMakers([])
    }
  }, [allLeadsResStr])

  useEffect(() => {
    const allLeads = JSON.parse(allLeadsStr)
    const leads = allLeads.filter((lead = {}) => {
      if (currentTab === 'all') return lead
      else if (lead.customerService && currentTab === lead.customerService._id) return lead
      else return false
    })

    setLeads(leads)
  }, [allLeadsStr, currentTab])

  const handleChangeTab = csId => {
    setCurrentTab(csId)
  }

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
