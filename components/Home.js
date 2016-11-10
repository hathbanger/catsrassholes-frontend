import React, { Component, PropTypes } from 'react'
import SignUpContainer from '../containers/SignUpContainer'
import Feed from './Feed'

export default class Home extends Component {
  

  render() {
    const { dispatch, isAuthenticated, errorMessage } = this.props
    return (
      <div className="container">
        <div className="col-md-8 col-md-offset-2">
          {!isAuthenticated &&
            <div>
              <Feed dispatch={dispatch} />
            </div>          
          }
          {isAuthenticated &&
            <h1>hello from home!</h1>
          }
        </div>
      </div>
    )
  }

}

Home.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string
}