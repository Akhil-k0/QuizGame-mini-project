import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

import {TbLogout} from 'react-icons/tb'

import './index.css'

const Header = props => {
  const logOut = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <div className="header-bg-container">
      <div className="header-details-container">
        <Link to="/">
          <img
            src="https://res.cloudinary.com/dxrszpxbx/image/upload/v1715679920/i8akbq8um3dfgn3yzv1l.svg"
            alt="website logo"
            className="web-logo"
          />
        </Link>
        <Link to="/login" onClick={logOut}>
          <TbLogout className="sm-logout" />
        </Link>
        <button type="button" className="logout-btn" onClick={logOut}>
          Logout
        </button>
      </div>
    </div>
  )
}

export default withRouter(Header)
