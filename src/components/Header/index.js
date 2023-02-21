import {Link} from 'react-router-dom'
import PopupContainer from '../PopupContainer'
import './index.css'
import ThemeContext from '../../context/ThemeContext'

const Header = () => (
  <ThemeContext.Consumer>
    {value => {
      const {isDarkMood, toggleTheme} = value

      const onClickThemeButton = () => {
        toggleTheme()
      }

      const websiteLogo = isDarkMood
        ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
        : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'

      const theme = isDarkMood
        ? 'https://assets.ccbp.in/frontend/react-js/light-theme-img.png'
        : 'https://assets.ccbp.in/frontend/react-js/dark-theme-img.png'

      const bgColor = isDarkMood ? 'dark' : 'light'

      return (
        <div className={`head-container ${bgColor}`}>
          <Link to="/">
            <img
              src={websiteLogo}
              alt="website logo"
              className="logo-image-header"
            />
          </Link>

          <div className="logout-container">
            <button
              type="button"
              className="button"
              onClick={onClickThemeButton}
              data-testid="theme"
            >
              <img src={theme} alt="theme" className="dark-image" />
            </button>

            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
              alt="profile"
              className="dark-image"
            />
            <PopupContainer />
          </div>
        </div>
      )
    }}
  </ThemeContext.Consumer>
)

export default Header
