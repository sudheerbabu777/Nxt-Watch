import './index.css'

const NotFound = () => (
  <div className="not-container">
    <img
      src="https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png"
      alt="not found"
      className="not-found-image"
    />

    <h1 className="not-title">Page Not Found</h1>
    <p className="not-message">
      we are sorry, the page you requested could not be found.
    </p>
  </div>
)

export default NotFound
