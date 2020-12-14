import { useState, useEffect } from 'react'

import { API_URL } from '../config'

import { useFetch } from '../hooks'

import Header from '../components/Header'
import Tab from '../components/Tab'
import ListLeads from '../components/ListLeads'

import './AdminPage.css'

const AdminPage = ({ socket }) => {
  const [currentTab, setCurrentTab] = useState('all')

  const [csRes, csHttp] = useFetch(API_URL + '/customer-service')
  const [leadRes, leadHttp] = useFetch(API_URL + '/lead')
  useEffect(() => {
    csHttp.doGet()
    leadHttp.doGet()
  }, [csHttp, leadHttp])

  const leadData = leadRes.data || {}
  const leadRows = leadData.rows || []
  const leads = leadRows.filter(lead => {
    if (currentTab === 'all') return lead
    else if (currentTab === lead.customerService._id) return lead
    else return false
  })

  const handleChangeTab = csId => {
    setCurrentTab(csId)
  }

  return (
    <div className='AdminPage'>
      <Header />
      <Tab
        leadRes={leadRes}
        csRes={csRes}
        onChange={handleChangeTab}
        currentTab={currentTab}
      />
      <ListLeads
        leads={leads}
      />
    </div>
  )
}

export default AdminPage
