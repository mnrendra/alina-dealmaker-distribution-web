import { FIRST_CHAT_TEMPLATE } from '../config'

import './ListLeads.css'

const ListLeads = ({ leads, date }) => {
  const handleOpenWhatsapp = (phone) => {
    const whatsappURL = 'whatsapp://send?phone=' + phone + '&text=' + FIRST_CHAT_TEMPLATE
    window.open(whatsappURL)
  }

  const renderListLeads = (leads = []) => {
    if (leads.length) {
      return leads.map((lead = {}) => {
        const { name, phone, created, customerService } = lead
        const id = lead._id

        const createdTime = new Date(created)
        const hours = createdTime.getHours()
        const minutes = createdTime.getMinutes()
        const seconds = createdTime.getSeconds()
        const createdTimeString = `${hours}:${minutes}:${seconds} WIB`

        return (
          <div
            key={id}
            className='ListLeads d-flex text-muted pt-3'
            onClick={() => handleOpenWhatsapp(phone)}
          >
            {/* */}
            <svg className='bd-placeholder-img flex-shrink-0 me-2 rounded' width='32' height='32' xmlns='http://www.w3.org/2000/svg' role='img' aria-label='Placeholder: 32x32' preserveAspectRatio='xMidYMid slice' focusable='false'>
              <title>Placeholder</title>
              <rect width='100%' height='100%' fill='#9E9E9E' />
              <text x='50%' y='50%' fill='#FFCCBC' dy='.3em'>{customerService && customerService.name && customerService.name.slice(0, 2)}</text>
            </svg>
            {/* */}
            <div className='pb-3 mb-0 small lh-sm border-bottom w-100'>
              <div className='d-flex justify-content-between'>
                <strong className='text-gray-dark'>{name} ({phone})</strong>
              </div>
              <span className='d-block'>{createdTimeString}</span>
            </div>
            {/* */}
          </div>
        )
      })
    } else {
      return (
        <div
          style={{ margin: '8px auto' }}
        >
          You do not have any leads today. Please wait and don't forget to take a coffee. Have a good day!
        </div>
      )
    }
  }

  const $date = !isNaN(date.getTime()) ? date : { getFullYear: () => false, getMonth: () => false, getDate: () => false }
  const $dateYear = $date.getFullYear()
  const $dateMonth = Number($date.getMonth()) ? ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][$date.getMonth()] : false
  const $dateDate = $date.getDate()
  const dateStr = $dateYear && $dateDate && $dateDate ? `${$dateMonth} ${$dateDate}, ${$dateYear}` : 'Error'

  return (
    <div className='ListLeads'>
      <main className='container'>
        {/* */}
        <div className='my-3 p-3 bg-white rounded shadow-sm'>
          <h6 className='border-bottom pb-2 mb-0'><strong>{dateStr}</strong></h6>
          {/* */}
          {renderListLeads(leads)}
          {/* */}
        </div>
        {/* */}
      </main>
    </div>
  )
}

export default ListLeads
