import Popup from 'reactjs-popup'
import {withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const PopupContainer = props => {
  const onClickButton = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <Popup
      modal
      trigger={
        <button type="button" className="logout-button">
          Logout
        </button>
      }
      className="popup-content"
    >
      {close => (
        <div>
          <p className="warning">Are you sure, you want to logout</p>
          <div className="popup-button">
            <button
              type="button"
              className="buttons color"
              onClick={() => close()}
            >
              Cancel
            </button>
            <button
              type="button"
              className="buttons logout"
              onClick={onClickButton}
            >
              Confirm
            </button>
          </div>
        </div>
      )}
    </Popup>
  )
}

export default withRouter(PopupContainer)
