import React from 'react'

const ThemeContext = React.createContext({
  isDarkMood: false,
  toggleTheme: () => {},
  savedVideosList: [],
  savedVideosButtonOnClick: () => {},
})

export default ThemeContext
