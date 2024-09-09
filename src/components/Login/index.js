import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    showPassword: true,
    isSubmitError: false,
    errorMsg: '',
  }

  getUsername = event => {
    this.setState({username: event.target.value})
  }

  getPassword = event => {
    this.setState({password: event.target.value})
  }

  showPassword = () => {
    this.setState(prevState => ({showPassword: !prevState.showPassword}))
  }

  onSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 2})
    history.replace('/')
    console.log(jwtToken)
  }

  onFailure = error => {
    this.setState({isSubmitError: true, errorMsg: error})
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const apiUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSuccess(data.jwt_token)
    } else {
      this.onFailure(data.error_msg)
    }
  }

  render() {
    const {
      username,
      password,
      showPassword,
      isSubmitError,
      errorMsg,
    } = this.state

    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-bg-container">
        <div className="login-card-container">
          <img
            src="https://res.cloudinary.com/dxrszpxbx/image/upload/v1715679920/i8akbq8um3dfgn3yzv1l.svg"
            alt="login website logo"
            className="website-logo"
          />
          <form className="form" onSubmit={this.submitForm}>
            <div className="login-inputs-container">
              <div className="input-container">
                <label htmlFor="username" className="label-text">
                  USERNAME
                </label>
                <input
                  type="text"
                  id="username"
                  className="input"
                  onChange={this.getUsername}
                  value={username}
                />
              </div>
              <div className="input-container">
                <label htmlFor="password" className="label-text">
                  PASSWORD
                </label>
                <input
                  type={showPassword ? 'password' : 'text'}
                  id="password"
                  className="input"
                  onChange={this.getPassword}
                  value={password}
                />
              </div>
              <div className="show-container">
                <input
                  type="checkbox"
                  id="show"
                  className="checkbox-input"
                  onChange={this.showPassword}
                />
                <label className="show-txt" htmlFor="show">
                  Show Password
                </label>
              </div>
            </div>
            <button type="submit" className="login-btn">
              {' '}
              Login
            </button>
            {isSubmitError && <p className="error-msg">{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default Login
