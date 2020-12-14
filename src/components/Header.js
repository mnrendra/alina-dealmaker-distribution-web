import Cookies from 'universal-cookie'

import './Header.css'

const Header = ({ user }) => {
  const handleLogout = () => {
    const cookies = new Cookies()
    cookies.set('token', '', { path: '/' })
    window.location.reload()
  }

  return (
    <div className='Header'>
      <nav className='navbar navbar-expand-lg fixed-top' aria-label='Main navigation'>
        <div className='container-fluid'>
          <span className='navbar-brand'>Hi{user ? ' ' + user.name : ''}! Good luck today!</span>
          <ul className='nav justify-content-end'>
            <li className='nav-item Header-Logout' onClick={handleLogout}><span className='nav-link active'>Logout</span></li>
          </ul>
        </div>
      </nav>
    </div>
  )
}

export default Header
