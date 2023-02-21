import {Component} from 'react'
import Cookies from 'js-cookie'
import ReactPlayer from 'react-player'
import Loader from 'react-loader-spinner'
import {AiOutlineLike, AiOutlineDislike} from 'react-icons/ai'
import {BiListPlus} from 'react-icons/bi'
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

class VideoItemDetails extends Component {
  state = {
    videoDetails: {},
    apiStatus: apiStatusCall.initial,
    like: false,
    disLike: false,
    saved: false,
  }

  componentDidMount() {
    this.getVideoItemDetails()
  }

  getVideoItemDetails = async () => {
    this.setState({apiStatus: apiStatusCall.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params

    const url = `https://apis.ccbp.in/videos/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok === true) {
      const videoDetails = data.video_details
      const updateVideoDetails = {
        id: videoDetails.id,
        publishedAt: videoDetails.published_at,
        thumbnailUrl: videoDetails.thumbnail_url,
        viewCount: videoDetails.view_count,
        title: videoDetails.title,
        videoUrl: videoDetails.video_url,
        description: videoDetails.description,

        profileImageUrl: videoDetails.channel.profile_image_url,
        name: videoDetails.channel.name,
        subscriberCount: videoDetails.channel.subscriber_count,
      }

      this.setState({
        videoDetails: updateVideoDetails,
        apiStatus: apiStatusCall.success,
      })
    } else {
      this.setState({apiStatus: apiStatusCall.failure})
    }
  }

  renderLoader = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#00ff" height={80} width={80} />
    </div>
  )

  onClickRetryButton = () => {
    this.getVideoItemDetails()
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

  renderVideo = () => {
    const {videoDetails} = this.state
    const {videoUrl} = videoDetails
    return (
      <div className="video-player">
        <ReactPlayer controls url={videoUrl} width="100%" height="65vh" />
      </div>
    )
  }

  renderVideoDetailsOnSuccess = () => (
    <ThemeContext.Consumer>
      {value => {
        const {isDarkMood, savedVideosButtonOnClick} = value

        const {videoDetails, saved, disLike, like} = this.state
        console.log(disLike)

        const textColor = isDarkMood ? 'text-dark' : 'text-light'

        const onClickSaveButton = () => {
          this.setState(prevState => ({saved: !prevState.saved}))
          savedVideosButtonOnClick({
            videoDetails,
          })
        }

        const onClickLikeButton = () => {
          this.setState(prevState => ({
            like: !prevState.like,
            disLike: false,
          }))
        }

        const onClickDislikeButton = () => {
          this.setState(prevState => ({
            disLike: !prevState.disLike,
            like: false,
          }))
        }

        const likeClassName = like
          ? 'button buttons click'
          : 'button buttons clicked'
        const disLikeClassName = disLike
          ? 'button buttons click clicked'
          : 'button buttons'
        const savedClassName = saved
          ? 'button buttons click'
          : 'button buttons clicked'
        const savedContext = saved ? 'saved' : 'save'

        const {
          title,
          publishedAt,
          description,
          viewCount,
          name,
          profileImageUrl,
          subscriberCount,
        } = videoDetails
        console.log(name)
        return (
          <div>
            {this.renderVideo()}
            <p className={`video-item-title ${textColor}`}>{title}</p>
            <div className="experience-container">
              <div className="view-container">
                <p className="video-view">{viewCount} views</p>
                <p className="video-published">{publishedAt}</p>
              </div>
              <div className="like-dislike-container">
                <button
                  type="button"
                  className={`${likeClassName} ${textColor}`}
                  onClick={onClickLikeButton}
                >
                  <AiOutlineLike size="20" />
                  Like
                </button>
                <button
                  type="button"
                  className={`button buttons ${disLikeClassName} ${textColor}`}
                  onClick={onClickDislikeButton}
                >
                  <AiOutlineDislike size="20" />
                  Dislike
                </button>
                <button
                  type="button"
                  className={`button buttons ${savedClassName} ${textColor}`}
                  onClick={onClickSaveButton}
                >
                  <BiListPlus size="20" />
                  {savedContext}
                </button>
              </div>
            </div>
            <hr color="#000000" />
            <div className="description-container">
              <img
                src={profileImageUrl}
                alt="channel logo"
                className="profile-image"
              />
              <div>
                <p className={`channel-name ${textColor}`}>{name}</p>
                <p className="subscribers">{subscriberCount} Subscribers</p>
                <p className={`video-description ${textColor}`}>
                  {description}
                </p>
              </div>
            </div>
          </div>
        )
      }}
    </ThemeContext.Consumer>
  )

  render() {
    const renderApiStatus = () => {
      const {apiStatus} = this.state

      switch (apiStatus) {
        case apiStatusCall.inProgress:
          return this.renderLoader()
        case apiStatusCall.success:
          return this.renderVideoDetailsOnSuccess()
        case apiStatusCall.failure:
          return this.renderFailureView()
        default:
          return null
      }
    }

    return (
      <ThemeContext.Consumer>
        {value => {
          const {isDarkMood} = value

          const themeBgColor = isDarkMood ? 'video-bg-light' : 'video-bg-dark'

          return (
            <>
              <Header />
              <div
                className="videos-list-container"
                data-testid="videoItemDetails"
              >
                <SideBar />
                <div className={`video-item-details-container ${themeBgColor}`}>
                  {renderApiStatus()}
                </div>
              </div>
            </>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default VideoItemDetails
