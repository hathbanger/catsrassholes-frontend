import React, { Component, PropTypes } from 'react'
import FeedItem from './FeedItem'
import catPics from '../catPics'


export default class Feed extends Component {
  renderFeed(dispatch, isAuthenticated){
      return (
          this.props.posts.map(function(pic, index){
            return <FeedItem dispatch={dispatch} isAuthenticated={isAuthenticated} key={index}  feedItem={pic} />
          })
      );
  }  

  render() {
    const { dispatch, errorMessage, posts, isAuthenticated } = this.props
    return (
        <ul className="list-group">
          { 
            (this.props.posts)
              ? <div> { this.renderFeed(dispatch, isAuthenticated) } </div> 
              : <div> Everything in the world is fine </div> 
          }
        </ul>
    )
  }

}

Feed.propTypes = {
  posts: PropTypes.array,
  dispatch: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string
}