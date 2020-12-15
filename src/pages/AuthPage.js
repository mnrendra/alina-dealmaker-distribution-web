import { useEffect, useState } from 'react'

import { API_URL } from '../config'

import { useFetch } from '../hooks'

import './AuthPage.css'

const AuthPage = ({ onLogged }) => {
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [alert, setAlert] = useState('')

  const [res, { doPost }] = useFetch(API_URL + '/auth')

  const response = JSON.stringify(res)

  useEffect(() => {
    const { error, fetching, data } = JSON.parse(response)
    if (error && error.message) {
      setAlert('error: ' + error.message)
    } else if (fetching) {
      setAlert('loading...')
    } else {
      if (data.error) {
        setAlert(data.error.message)
      } else if (data.invalid) {
        setAlert(data.invalid)
      } else if (data.token) {
        onLogged(data.token)
      } else {
        setAlert('')
      }
    }
  }, [response, onLogged])

  const handleSubmit = () => {
    doPost({
      phone,
      password
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
