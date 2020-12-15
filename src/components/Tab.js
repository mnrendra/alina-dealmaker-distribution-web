import './Tab.css'

const Tab = ({ currentTab, dealMakers, leads, onChange }) => {
  const renderTabs = (dealMakers = [], allLeads = []) => {
    if (dealMakers.length) {
      return dealMakers.map(dealMaker => {
        const leads = allLeads.filter(lead => lead.customerService._id === dealMaker._id)

        return (
          <span
            key={dealMaker._id}
            className={`nav-link ${currentTab === dealMaker._id ? 'active' : ''}`}
            onClick={() => onChange(dealMaker._id)}
            style={{ cursor: 'pointer' }}
          >
            {dealMaker.name}
            <span
              className='badge bg-light text-dark rounded-pill align-text-bottom'
            >
              {leads.length}
            </span>
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
          <span
            className={`nav-link ${currentTab === 'all' ? 'active' : ''}`}
            onClick={() => onChange('all')}
            style={{ cursor: 'pointer' }}
          >
            All
            <span
              className='badge bg-light text-dark rounded-pill align-text-bottom'
            >
              {leads.length}
            </span>
          </span>
          {renderTabs(dealMakers, leads)}
        </nav>
      </div>
    </div>
  )
}

export default Tab
