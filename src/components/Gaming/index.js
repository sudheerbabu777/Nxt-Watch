import {Component} from 'react'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'
import {SiYoutubegaming} from 'react-icons/si'
import Loader from 'react-loader-spinner'
import ThemeContext from '../../context/ThemeContext'
import Header from '../Header'
import SideBar from '../SideBar'
import './index.css'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

const apiStatusCall = {
  initial: 'INITIAL',
  inProgress: 'IN PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Gaming extends Component {
  state = {
    gameList: [],
    apiStatus: apiStatusCall.initial,
  }

  componentDidMount() {
    this.getGameVideoList()
  }

  getGameVideoList = async () => {
    this.setState({apiStatus: apiStatusCall.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/videos/gaming'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok === true) {
      const video = data.videos
      console.log(video)
      const updateGame = video.map(each => ({
        thumbnailUrl: each.thumbnail_url,
        viewCount: each.view_count,
        title: each.title,
        id: each.id,
      }))

      this.setState({gameList: updateGame, apiStatus: apiStatusCall.success})
    } else {
      this.setState({apiStatus: apiStatusCall.failure})
    }
  }

  renderGameList = () => {
    const {gameList} = this.state

    return (
      <ThemeContext.Consumer>
        {value => {
          const {isDarkMood} = value

          const textColor = isDarkMood ? 'text-dark' : 'text-light'
          return (
            <>
              <div className="game">
                <div className="game-icon">
                  <SiYoutubegaming size="30" color="red" />
                </div>
                <h1 className="gaming">Gaming</h1>
              </div>
              <ul className="game-list-container">
                {gameList.map(each => (
                  <Link to={`/videos/${each.id}`} className="link-item">
                    <li className="game-item-container" key={each.id}>
                      <img
                        src={each.thumbnailUrl}
                        alt="video thumbnail"
                        className="gaming-image"
                      />
                      <p className={`game-title ${textColor}`}>{each.title}</p>
                      <p className="game-views">
                        {each.viewCount} Watching Worldwide
                      </p>
                    </li>
                  </Link>
                ))}
              </ul>
            </>
          )
        }}
      </ThemeContext.Consumer>
    )
  }

  renderLoader = () => (
    <div className="loader" data-testid="loader">
      <Loader type="ThreeDots" color="#000bff" height={60} width={60} />
    </div>
  )

  renderFailureView = () => (
    <ThemeContext.Consumer>
      {value => {
        const {isDarkMood} = value
        const textColor = isDarkMood ? 'text-dark' : 'text-light'

        const failureImage = isDarkMood
          ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png'
          : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png'

        return (
          <div className="failure-container">
            <img
              src={failureImage}
              alt="failure view"
              className="failure-image"
            />
            <h1 className={`failure-title ${textColor}`}>
              Oops! Something Went Wrong
            </h1>
            <p className={`failure-description ${textColor}`}>
              We are having some trouble to complete your request. Please try
              again.
            </p>
            <button
              className="retry-button"
              type="button"
              onClick={this.onClickRetryButton}
            >
              Retry
            </button>
          </div>
        )
      }}
    </ThemeContext.Consumer>
  )

  onClickRetryButton = () => {
    this.getGameVideoList()
  }

  renderAplStatus = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusCall.inProgress:
        return this.renderLoader()
      case apiStatusCall.success:
        return this.renderGameList()
      case apiStatusCall.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <ThemeContext.Consumer>
        {value => {
          const {isDarkMood} = value

          const bgColor = isDarkMood ? 'bg-dark' : 'bg-light'
          return (
            <>
              <Header />
              <div className="game-container" data-testid="gaming">
                <SideBar />
                <div className={`game-video-container ${bgColor}`}>
                  {this.renderAplStatus()}
                </div>
              </div>
            </>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default Gaming
