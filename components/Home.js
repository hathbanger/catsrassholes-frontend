import React, { Component, PropTypes } from 'react'
import SignUpContainer from '../containers/SignUpContainer'

export default class Home extends Component {
  

  render() {
    const { dispatch, isAuthenticated, errorMessage } = this.props
    return (
      <div className="container">
        <div className="col-md-8 col-md-offset-2">
          {!isAuthenticated &&
            <div>
            <ul className="list-group text-center">
              <li className="list-group-item text-xs-center">
                <img  className="img-thumbnail" src="http://memeguy.com/photos/images/cats-are-assholes-37440.jpg"/>
              <p>This guy</p></li>
              <li className="list-group-item text-xs-center">
                <img  className="img-thumbnail" src="http://www.wild-facts.com/wp-content/uploads/2015/03/9-Reasons-Why-Cats-are-Jerks.jpg"/>
                <p> more cats! </p>
              </li>
              <li className="list-group-item text-xs-center">
                <img  className="img-thumbnail" src="https://b1.burst.zone/wp-content/uploads/2013/07/cats_are_jerks_8.jpg"/>
                <p> more cats! </p>
              </li>
              <li className="list-group-item text-xs-center">
                <img  className="img-thumbnail" src="https://b2.burst.zone/wp-content/uploads/2013/07/cats_are_jerks_16.jpg"/>
                <p> more cats! </p>
              </li>
              <li className="list-group-item text-xs-center">
                <img  className="img-thumbnail" src="https://s-media-cache-ak0.pinimg.com/236x/1c/a6/fc/1ca6fc0e44a131623b8a866d7177dd5a.jpg"/>
                <p> more cats! </p>
              </li>
            </ul>            
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