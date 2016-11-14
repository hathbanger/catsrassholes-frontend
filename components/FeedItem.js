import React, { Component, PropTypes } from 'react'
import SocialBar from './SocialBar'
import { likePost } from '../actions'

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
                  <div className="text-md-center">
                    <img  className="" style={{width: "100%"}} src={this.props.feedItem.pic} />
                  </div>
                </div>
                <SocialBar dispatch={dispatch} pic_id={this.props.feedItem.id} onClickLike={ creds => dispatch(likePost(creds)) } />
              </li>
            </div>
    )
  }

}

FeedItem.propTypes = {
  dispatch: PropTypes.func.isRequired,
  errorMessage: PropTypes.string
}
