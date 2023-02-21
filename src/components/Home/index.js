import Header from '../Header'
import ThemeContext from '../../context/ThemeContext'
import VideosList from '../VideosList'
import SideBar from '../SideBar'
import './index.css'

const Home = () => (
  <ThemeContext.Consumer>
    {value => {
      const {isDarkMood} = value

      const bgColor = isDarkMood ? 'home-bg-dark' : 'home-bg-light'

      return (
        <>
          <Header />
          <div className="videos-list-container" data-testid="home">
            <SideBar />
            <div className={`video-container-home ${bgColor}`}>
              <VideosList />
            </div>
          </div>
        </>
      )
    }}
  </ThemeContext.Consumer>
)

export default Home
