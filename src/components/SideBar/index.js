import {Link} from 'react-router-dom'
import {BiHome} from 'react-icons/bi'
import {AiOutlineFire, AiOutlineFolderAdd} from 'react-icons/ai'
import {GrGamepad} from 'react-icons/gr'
import ThemeContext from '../../context/ThemeContext'
import './index.css'

const SideBar = () => (
  <ThemeContext.Consumer>
    {value => {
      const {isDarkMood} = value

      const onClickHome = () => {}

      const bgColor = isDarkMood ? 'side-light' : 'side-dark'
      const textColor = isDarkMood ? 'text-dark' : 'text-light'
      const icons = isDarkMood ? 'text-dark' : 'text-light'

      return (
        <div className={`side-bar-container ${bgColor}`}>
          <ul>
            <Link to="/" onClick={onClickHome} className="link-item">
              <li className="bar-container">
                <BiHome size="20" color={`${icons}`} />
                <p className={`side-title ${textColor}`}>Home</p>
              </li>
            </Link>
            <Link to="/trending" className="link-item">
              <li className="bar-container">
                <AiOutlineFire size="20" />
                <p className={`side-title ${textColor}`}>Trending</p>
              </li>
            </Link>
            <Link to="/gaming" className="link-item">
              <li className="bar-container">
                <GrGamepad size="20" />
                <p className={`side-title ${textColor}`}>Gaming</p>
              </li>
            </Link>
            <Link to="/saved-videos" className="link-item">
              <li className="bar-container">
                <AiOutlineFolderAdd />
                <p className={`side-title ${textColor}`}>Saved videos</p>
              </li>
            </Link>
          </ul>
          <div className="description-container-contact">
            <p className={`contact ${textColor}`}>CONTACT US</p>
            <div>
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
                alt="facebook logo"
                className="contact-image"
              />
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
                alt="twitter logo"
                className="contact-image"
              />
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
                alt="linked in logo"
                className="contact-image"
              />
            </div>
            <p className={`description-channel ${textColor}`}>
              Enjoy! Now to see your channels and recommendations!
            </p>
          </div>
        </div>
      )
    }}
  </ThemeContext.Consumer>
)

export default SideBar
