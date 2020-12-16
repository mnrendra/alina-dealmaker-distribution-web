import { useState } from 'react'

import { API_URL } from '../config'

import './AuthPage.css'

const AuthPage = ({ onLogged }) => {
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [alert, setAlert] = useState('')

  const handleSubmit = () => {
    fetch(API_URL + '/auth', {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify({
        phone,
        password
      })
    })
      .then(res => res.json())
      .then(json => {
        if (json.error) {
          setAlert(json.error.message)
        } else if (json.invalid) {
          setAlert(json.invalid)
        } else if (json.token) {
          onLogged(json.token)
        } else {
          setAlert('')
        }
      })
  }

  const handleChangePhone = e => {
    const phone = e.currentTarget.value
    const validPhone = phone.replace(/[^0-9 +]+/g, '').slice(0, 16)
    setPhone(validPhone)
  }

  const handlePassword = e => {
    const password = e.currentTarget.value
    setPassword(password)
  }

  return (
    <div className='AuthPage'>
      <div className='form-signin'>
        {/* */}
        <div className='text-center mb-4'>
          <img className='AuthPage-Logo' src='./logo_alina_long.png' alt='' />
          {alert && <p>{alert}</p>}
        </div>
        {/* */}
        <div className='form-label-group'>
          <label htmlFor='inputPhone'>Phone Number</label>
          <input value={phone} onChange={handleChangePhone} type='text' id='inputPhone' className='form-control' placeholder='Phone Number' required autoFocus />
        </div>
        {/* */}
        <div className='form-label-group'>
          <label htmlFor='inputPassword'>Password</label>
          <input value={password} onChange={handlePassword} type='password' id='inputPassword' className='form-control' placeholder='Password' required />
        </div>
        {/* */}
        <button className='btn btn-lg btn-primary btn-block' onClick={handleSubmit}>Sign in</button>
        <p className='mt-5 mb-3 text-muted text-center'>Alina Group &copy; 2020</p>
        {/* */}
      </div>
    </div>
  )
}

export default AuthPage
