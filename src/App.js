import {Switch, Route, Redirect} from 'react-router-dom'
import {Component} from 'react'
import ThemeContext from './context/ThemeContext'
import Home from './components/Home'
import Login from './components/Login'
import Gaming from './components/Gaming'
import Trending from './components/Trending'
import SavedVideos from './components/SavedVideos'
import VideoItemDetails from './components/VideoItemDetails'
import NotFound from './components/NotFound'
import ProtectRouter from './components/ProtectRouter'
import './App.css'

// Replace your code here
class App extends Component {
  state = {
    isDarkMood: false,
    savedVideosList: [],
  }

  toggleTheme = () => {
    this.setState(prevState => ({isDarkMood: !prevState.isDarkMood}))
  }

  savedVideosButtonOnClick = data => {
    const {savedVideosList} = this.state
    this.setState({savedVideosList: [...savedVideosList, data]})
  }

  render() {
    const {isDarkMood, savedVideosList} = this.state

    return (
      <ThemeContext.Provider
        value={{
          isDarkMood,
          toggleTheme: this.toggleTheme,
          savedVideosList,
          savedVideosButtonOnClick: this.savedVideosButtonOnClick,
        }}
      >
        <Switch>
          <Route exact path="/Login" component={Login} />
          <ProtectRouter exact path="/" component={Home} />
          <ProtectRouter exact path="/gaming" component={Gaming} />
          <ProtectRouter exact path="/trending" component={Trending} />
          <ProtectRouter exact path="/saved-videos" component={SavedVideos} />
          <ProtectRouter
            exact
            path="/videos/:id"
            component={VideoItemDetails}
          />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </ThemeContext.Provider>
    )
  }
}

export default App
