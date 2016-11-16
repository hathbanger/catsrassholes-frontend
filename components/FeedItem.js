import React, { Component, PropTypes } from 'react'
import SocialBar from './SocialBar'
import { likePost, deletePost } from '../actions'

export default class FeedItem extends Component {
  
  render() {
    const { dispatch, errorMessage, like } = this.props

    return (
            <div>
              <li className="list-group-item">
                <div className="row">
                  <h5>{this.props.feedItem.title}</h5>
                </div>
                <div className="row">
                  <div className="text-md-center">
                    <img  className="" style={{width: "100%"}} src={this.props.feedItem.imgurl} />
                  </div>
                  <p>{this.props.feedItem.body}</p>
                </div>
                <SocialBar dispatch={dispatch} pic_id={this.props.feedItem.id} onClickLike={ creds => dispatch(likePost(creds)) } onClickDelete={ creds => dispatch(deletePost(creds)) } />
              </li>
            </div>
    )
  }
}

FeedItem.propTypes = {
  dispatch: PropTypes.func.isRequired,
  errorMessage: PropTypes.string
}
