import {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {HiFire} from 'react-icons/hi'
import Header from '../Header'
import ThemeContext from '../../context/ThemeContext'
import SideBar from '../SideBar'
import './index.css'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

const apiStatusCall = {
  initial: 'INITIAL',
  inProgress: 'IN PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Trending extends Component {
  state = {
    trendingList: [],
    apiStatus: apiStatusCall.initial,
  }

  componentDidMount() {
    this.getTrendingVideo()
  }

  getTrendingVideo = async () => {
    this.setState({apiStatus: apiStatusCall.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/videos/trending'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok === true) {
      const updateVideo = data.videos.map(each => ({
        channel: {
          profileImageUrl: each.channel.profile_image_url,
          name: each.channel.name,
        },
        id: each.id,
        publishedAt: each.published_at,
        thumbnailUrl: each.thumbnail_url,
        viewCount: each.view_count,
        title: each.title,
      }))
      this.setState({
        trendingList: updateVideo,
        apiStatus: apiStatusCall.success,
      })
    } else {
      this.setState({apiStatus: apiStatusCall.failure})
    }
  }

  renderAplStatus = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusCall.inProgress:
        return this.renderLoader()
      case apiStatusCall.success:
        return this.renderTrendingList()
      case apiStatusCall.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  renderTrendingList = () => {
    const {trendingList} = this.state

    return (
      <ThemeContext.Consumer>
        {value => {
          const {isDarkMood} = value

          const textColor = isDarkMood ? 'text-dark' : 'text-light'

          return (
            <>
              <div className="fire">
                <div className="fire-container">
                  <HiFire size="30" color="red" />
                </div>
                <h1 className="trending">Trending</h1>
              </div>

              <ul>
                {trendingList.map(each => (
                  <Link to={`/videos/${each.id}`} className="link-item">
                    <li className="trend-item-container" key={each.id}>
                      <img
                        src={each.thumbnailUrl}
                        alt="video thumbnail"
                        className="trend-thumbnail"
                      />
                      <div className="trend-details-container">
                        <p className={`trend-title ${textColor}`}>
                          {each.title}
                        </p>
                        <p className={`channel-name ${textColor}`}>
                          {each.channel.name}
                        </p>
                        <div className="view-container">
                          <p className="trend-view">{each.viewCount} Views</p>
                          <p className="trend-published">{each.publishedAt}</p>
                        </div>
                      </div>
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
      <Loader type="ThreeDots" color="#000ffd" width={50} height={50} />
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
    this.getTrendingVideo()
  }

  render() {
    return (
      <ThemeContext.Consumer>
        {value => {
          const {isDarkMood} = value

          const bgColor = isDarkMood ? 'trend-bg-dark' : 'trend-bg-light'
          return (
            <>
              <Header />
              <div className="trending-container" data-testid="trending">
                <SideBar />
                <div className={`tending-video-container ${bgColor}`}>
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

export default Trending
