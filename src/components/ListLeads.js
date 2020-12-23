import { useEffect, useState } from 'react'

import { FIRST_DATE } from '../config'

import {
  firstChat,
  firstChatAyunda,
  firstChatDebby,
  firstChatHendy,
  firstChatRadit
} from '../utils/whatsappTemplates'

import './ListLeads.css'

const ListLeads = ({ user, leads, date, onChangeDate }) => {
  const [prevDisabled, setPrevDisabled] = useState(false)
  const [nextDisabled, setNextDisabled] = useState(false)

  useEffect(() => {
    //
    const fYear = date.getFullYear()
    const fMonth = date.getMonth()
    const fDate = date.getDate()
    const filteredDate = Number(`${fYear}${(fMonth + 1) < 10 ? '0' + (fMonth + 1) : (fMonth + 1)}${fDate}`)
    //
    const now = new Date()
    const tYear = now.getFullYear()
    const tMonth = now.getMonth()
    const tDate = now.getDate()
    const today = Number(`${tYear}${(tMonth + 1) < 10 ? '0' + (tMonth + 1) : (tMonth + 1)}${tDate}`)
    //
    filteredDate >= today ? setNextDisabled(true) : setNextDisabled(false)
    //
    const firstDate = new Date(FIRST_DATE)
    filteredDate <= firstDate.getTime() ? setPrevDisabled(false) : setPrevDisabled(false)
    //
  }, [setPrevDisabled, setNextDisabled, date])

  const handleOpenWhatsapp = (phone, leadName, userName) => {
    const now = new Date()
    const hours = now.getHours()
    let time = ''
    if (hours >= 0 && hours < 10) time = 'pagi'
    else if (hours >= 10 && hours < 15) time = 'siang'
    else if (hours >= 15 && hours < 18) time = 'sore'
    else time = 'malam'
    let template = firstChat
    switch (userName) {
      case 'Ayunda': template = firstChatAyunda; break
      case 'Debby': template = firstChatDebby; break
      case 'Hendy': template = firstChatHendy; break
      case 'Radit': template = firstChatRadit; break
      default: template = firstChat
    }
    const whatsappURL = 'whatsapp://send?phone=' + phone + '&text=' + template(time, leadName, userName)
    window.open(whatsappURL)
  }

  const handlePrevDate = () => {
    if (!prevDisabled) {
      onChangeDate(new Date(date.getTime() - (1000 * 60 * 60 * 24)))
    }
  }

  const handleNextDate = () => {
    if (!nextDisabled) {
      onChangeDate(new Date(date.getTime() + (1000 * 60 * 60 * 24)))
    }
  }

  const renderListLeads = (user = {}, leads = []) => {
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
            className='ListLeads-List d-flex text-muted pt-3'
            onClick={() => handleOpenWhatsapp(phone, lead.name, user.name)}
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
        <div className='ListLeads-List d-flex text-muted pt-3'>
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
          <div className='ListLeads-Header'>
            <div className='ListLeads-Header-Icon'>
              <svg className={prevDisabled ? 'disabled' : ''} fill='inherit' onClick={handlePrevDate}>
                <path d='M0 0h24v24H0z' fill='none' />
                <path d='M11.67 3.87L9.9 2.1 0 12l9.9 9.9 1.77-1.77L3.54 12z' />
              </svg>
            </div>
            <div className='ListLeads-Title'><strong>{dateStr}</strong></div>
            <div className='ListLeads-Header-Icon ListLeads-Header-Icon-Right'>
              <svg className={nextDisabled ? 'disabled' : ''} fill='inherit' onClick={handleNextDate}>
                <path d='M0 0h24v24H0z' fill='none' />
                <path d='M5.88 4.12L13.76 12l-7.88 7.88L8 22l10-10L8 2z' />
              </svg>
            </div>
          </div>
          <div classList='ListLeads-Body'>
            {/* */}
            {renderListLeads(user, leads)}
            {/* */}
          </div>
        </div>
        {/* */}
      </main>
    </div>
  )
}

export default ListLeads
