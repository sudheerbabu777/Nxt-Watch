import {Link} from 'react-router-dom'
import ThemeContext from '../../context/ThemeContext'
import './index.css'

const VideosListItem = props => (
  <ThemeContext.Consumer>
    {value => {
      const {isDarkMood} = value

      const textColor = isDarkMood ? 'search-dark' : 'search-light'

      const {videoItemDetails} = props
      const {
        id,
        channel,
        publishedAt,
        thumbnailUrl,
        viewCount,
        title,
      } = videoItemDetails
      return (
        <Link to={`/videos/${id}`} className="link-item">
          <li className="item-container">
            <img
              src={thumbnailUrl}
              alt="video thumbnail"
              className="thumbnail-image"
            />
            <div className="details-container">
              <img
                src={channel.profileImageUrl}
                alt="channel logo"
                className="profile-image"
              />
              <div>
                <p className={`video-title ${textColor}`}>{title}</p>
                <p className="channel-name">{channel.name}</p>
                <div className="published-container">
                  <p className="view-count">{viewCount} views</p>
                  <p className="published">{publishedAt}</p>
                </div>
              </div>
            </div>
          </li>
        </Link>
      )
    }}
  </ThemeContext.Consumer>
)

export default VideosListItem
