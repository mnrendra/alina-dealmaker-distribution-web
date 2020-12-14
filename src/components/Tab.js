import './Tab.css'

const Tab = ({ csRes, leadRes, onChange, currentTab }) => {
  const renderTabs = ({ data }) => {
    const res = data || {}
    const rows = res.rows || []

    if (rows.length) {
      return rows.map(cs => {
        return (
          <span key={cs._id} className={`nav-link ${currentTab === cs._id ? 'active' : ''}`} onClick={() => onChange(cs._id)} style={{ cursor: 'pointer' }}>
            {cs.name}
            <span className='badge bg-light text-dark rounded-pill align-text-bottom'>{cs.leads.length}</span>
          </span>
        )
      })
    } else {
      return <></>
    }
  }

  return (
    <div className='Tab'>
      <div className='nav-scroller shadow-sm'>
        <nav className='nav nav-underline' aria-label='Secondary navigation'>
          <span className={`nav-link ${currentTab === 'all' ? 'active' : ''}`} onClick={() => onChange('all')} style={{ cursor: 'pointer' }}>
            All
            <span className='badge bg-light text-dark rounded-pill align-text-bottom'>{leadRes.data && leadRes.data.total}</span>
          </span>
          {renderTabs(csRes)}
        </nav>
      </div>
    </div>
  )
}

export default Tab
