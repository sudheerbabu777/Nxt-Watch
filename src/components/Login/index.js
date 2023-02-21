import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    errorMsg: '',
    checkInput: '',
    checkIt: false,
    isResponse: false,
  }

  onFailureResponse = errorMsg => {
    this.setState({errorMsg, isResponse: true})
  }

  onSuccessFul = jwtToken => {
    const {history} = this.props
    history.replace('/')
    Cookies.set('jwt_token', jwtToken, {expires: 30})
  }

  onSubmitButton = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSuccessFul(data.jwt_token)
    } else {
      this.onFailureResponse(data.error_msg)
    }

    console.log(data)
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onChangeCheckBox = event => {
    this.setState(prevState => ({
      checkInput: event.target.value,
      checkIt: !prevState.checkIt,
    }))
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    const {
      username,
      password,
      checkInput,
      checkIt,
      errorMsg,
      isResponse,
    } = this.state

    const typeInput = checkIt ? 'Text' : 'password'
    return (
      <div className="login-container">
        <form className="form" onSubmit={this.onSubmitButton}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
            alt="website logo"
            className="logo-image"
          />
          <div className="input-container">
            <label htmlFor="username" className="label">
              USERNAME
            </label>
            <input
              type="text"
              className="input-bar"
              placeholder="Username"
              id="username"
              onChange={this.onChangeUsername}
              value={username}
            />
          </div>
          <div className="input-container">
            <label htmlFor="password" className="label">
              PASSWORD
            </label>
            <input
              type={typeInput}
              className="input-bar"
              placeholder="Password"
              id="password"
              onChange={this.onChangePassword}
              value={password}
            />
            <div className="check-box-container">
              <input
                type="checkBox"
                className="check-box"
                id="checkBox"
                onChange={this.onChangeCheckBox}
                value={checkInput}
              />
              <label htmlFor="checkBox" className="label">
                Show Password
              </label>
            </div>
          </div>

          <button type="submit" className="login-button">
            Login
          </button>
          {isResponse && <p className="error">{errorMsg}</p>}
        </form>
      </div>
    )
  }
}

export default Login
