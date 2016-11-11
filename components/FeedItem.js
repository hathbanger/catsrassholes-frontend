import React, { Component, PropTypes } from 'react'
import SocialBar from './SocialBar'

export default class FeedItem extends Component {
  
  render() {
    const { dispatch, errorMessage } = this.props

    return (
            <div>
              <li className="list-group-item">
                <div className="row">
                  <h5>{this.props.feedItem.body}</h5>
                </div>
                <div className="row">
                  <div class="text-md-center">
                    <img  className="img-thumbnail" style={{width: "100%"}} src={this.props.feedItem.pic} />
                  </div>
                </div>
              </li>
              <SocialBar dispatch={dispatch} />
            </div>

    )
  }

}

FeedItem.propTypes = {
  dispatch: PropTypes.func.isRequired,
  errorMessage: PropTypes.string
}
