const ListLeads = ({ leads }) => {
  const renderListLeads = (leads = []) => {
    if (leads.length) {
      return leads.map(lead => {
        const createdTime = new Date(lead.created)
        const hours = createdTime.getHours()
        const minutes = createdTime.getMinutes()
        const seconds = createdTime.getSeconds()
        const createdTimeString = `${hours}:${minutes}:${seconds} WIB`

        const phone = 'whatsapp://send?phone=' + lead.phone + '&text=Selamat%20sore'

        return (
          <div key={lead._id} className='d-flex text-muted pt-3'>
            {/* */}
            <svg className='bd-placeholder-img flex-shrink-0 me-2 rounded' width='32' height='32' xmlns='http://www.w3.org/2000/svg' role='img' aria-label='Placeholder: 32x32' preserveAspectRatio='xMidYMid slice' focusable='false'>
              <title>Placeholder</title>
              <rect width='100%' height='100%' fill='#007bff' />
              <text x='50%' y='50%' fill='#007bff' dy='.3em'>32x32</text>
            </svg>
            {/* */}
            <div className='pb-3 mb-0 small lh-sm border-bottom w-100'>
              <div className='d-flex justify-content-between'>
                <strong className='text-gray-dark'>{lead.name} ({lead.phone})</strong>
                <a href={phone}>Taken by: <strong>{lead.customerService.name}</strong></a>
              </div>
              <span className='d-block'>{createdTimeString}</span>
            </div>
          </div>
        )
      })
    } else {
      return <div style={{ margin: '8px auto' }}>You do not have any leads today. Please wait and don't forget to take a coffee. Have a good day!</div>
    }
  }

  return (
    <>
      <main className='container'>
        {/* */}
        <div className='my-3 p-3 bg-white rounded shadow-sm'>
          <h6 className='border-bottom pb-2 mb-0'><strong>Dec 11, 2020</strong></h6>
          {/* */}
          {renderListLeads(leads)}
        </div>
      </main>
    </>
  )
}

export default ListLeads
