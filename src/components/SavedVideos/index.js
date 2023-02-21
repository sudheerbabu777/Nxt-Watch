import {HiFire} from 'react-icons/hi'
import ThemeContext from '../../context/ThemeContext'
import Header from '../Header'
import SideBar from '../SideBar'

import './index.css'

const SavedVideos = () => (
  <ThemeContext.Consumer>
    {value => {
      const {isDarkMood, savedVideosList} = value
      console.log(savedVideosList[0])

      const bgColor = isDarkMood ? 'bg-dark' : 'bg-light'

      const textColor = isDarkMood ? 'text-dark' : 'text-light'

      const renderTrendingList = () =>
        savedVideosList ? (
          <div className="no-video-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
              alt="no saved videos"
              className="no-saved-video"
            />
            <h1 className={`no-video-title ${textColor}`}>
              No saved videos found
            </h1>
            <p className={`no-video-description ${textColor}`}>
              Save your videos by clicking a button
            </p>
          </div>
        ) : (
          <>
            <div className="fire">
              <div className="fire-container">
                <HiFire size="30" color="red" />
              </div>
              <h1 className="trending">Saved videos</h1>
            </div>

            <ul>
              {savedVideosList.map(each => (
                <li className="trend-item-container" key={each.id}>
                  <img
                    src={each.profileImageUr}
                    alt="video thumbnail"
                    className="trend-thumbnail"
                  />
                  <div className="trend-details-container">
                    <p className={`trend-title ${textColor}`}>{each.title}</p>
                    <p className={`channel-name ${textColor}`}>{each.name}</p>
                    <div className="view-container">
                      <p className="trend-view">
                        {each.videoDetails.viewCount} Views
                      </p>
                      <p className="trend-published">{each.publishedAt}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </>
        )

      return (
        <>
          <Header />
          <div className="saved-container">
            <SideBar />
            <div className={`saved-video-container ${bgColor}`}>
              {renderTrendingList()}
            </div>
          </div>
        </>
      )
    }}
  </ThemeContext.Consumer>
)

export default SavedVideos
