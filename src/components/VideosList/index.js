import {Component} from 'react'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'
import {GrClose} from 'react-icons/gr'
import Loader from 'react-loader-spinner'
import VideosListItem from '../VideosListItem'
import ThemeContext from '../../context/ThemeContext'
import {BannerContainer} from './styledComponents'
import './index.css'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

const apiStatusCall = {
  initial: 'INITIAL',
  inProgress: 'IN PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class VideosList extends Component {
  state = {
    videosList: [],
    searchInput: '',
    apiStatus: apiStatusCall.initial,
  }

  componentDidMount() {
    this.getVideosList()
  }

  getVideosList = async () => {
    this.setState({apiStatus: apiStatusCall.inProgress})
    const {searchInput} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/videos/all?search=${searchInput}`
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
      this.setState({videosList: updateVideo, apiStatus: apiStatusCall.success})
    } else {
      this.setState({apiStatus: apiStatusCall.failure})
    }
  }

  renderSearchEmpty = () => (
    <ThemeContext.Consumer>
      {value => {
        const {isDarkMood} = value

        const color = isDarkMood ? 'search-dark' : 'search-light'

        return (
          <div className="no-search-container">
            <img
              alt="no videos"
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
              className="not-found-image"
            />

            <h1 className={`not-title ${color}`}>No Search results found</h1>
            <p className={`not-message ${color}`}>
              Try different key words or remove search filter
            </p>
          </div>
        )
      }}
    </ThemeContext.Consumer>
  )

  renderVideosList = () => {
    const {videosList} = this.state
    console.log(videosList)

    return (
      <ul className="video-list">
        {videosList.length === 0
          ? this.renderSearchEmpty()
          : videosList.map(each => (
              <VideosListItem videoItemDetails={each} key={each.id} />
            ))}
      </ul>
    )
  }

  onClickBanner = () => {
    this.setState({isBanner: true})
  }

  onClickRetryButton = () => {
    this.getVideosList()
  }

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

  renderBanner = () => {
    const {isBanner} = this.state
    const banner = isBanner ? '' : 'hide'
    return (
      <>
        {banner && (
          <BannerContainer>
            <div className="small-container" data-testid="banner">
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                alt="nxt watch logo"
                className="logo-image-header"
              />
              <p className="banner-description">Buy Nxt Watch Premium</p>
              <button className="get-button" type="button" data-testid="close">
                GET IT NOW
              </button>
            </div>
            <button type="button" className="remove-button" data-testid="close">
              <GrClose size="20" color="#000000" onClick={this.onClickBanner} />
            </button>
          </BannerContainer>
        )}
      </>
    )
  }

  onChangeSearch = event => {
    this.setState({searchInput: event.target.value})
  }

  onClickSearchButton = () => {
    this.getVideosList()
  }

  renderSearch = () => {
    const {searchInput} = this.state

    return (
      <>
        <div className="search-container">
          <input
            type="search"
            placeholder="Search"
            className="search"
            onChange={this.onChangeSearch}
            value={searchInput}
          />
          <button
            type="button"
            data-testid="searchButton"
            className="button"
            onClick={this.onClickSearchButton}
          >
            <BsSearch size="20" color="#64748b" />
          </button>
        </div>
      </>
    )
  }

  renderVideoListPage = () => (
    <div>
      {this.renderSearch()}
      {this.renderVideosList()}
    </div>
  )

  renderLoader = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#000dff" />
    </div>
  )

  renderApiCallStatus = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusCall.inProgress:
        return this.renderLoader()
      case apiStatusCall.success:
        return (
          <>
            {this.renderBanner()}
            {this.renderVideoListPage()}
          </>
        )
      case apiStatusCall.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    const {videosList} = this.state
    console.log(videosList)
    return <div className="video-container">{this.renderApiCallStatus()}</div>
  }
}

export default VideosList
