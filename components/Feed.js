import React, { Component, PropTypes } from 'react'
import FeedItem from './FeedItem'
import catPics from '../catPics'


export default class Feed extends Component {
  renderFeed(dispatch){
      return (
          this.props.posts.map(function(pic, index){
            return <FeedItem dispatch={dispatch} key={index}  feedItem={pic} />
          })
      );
  }  

  render() {
    const { dispatch, errorMessage, posts } = this.props
    console.log('this.props.posts', this.props.posts)
    return (
        <ul className="list-group">
          { 
            (this.props.posts)
              ? <div> { this.renderFeed(dispatch) } </div> 
              : <div> Everything in the world is fine </div> 
          }
        </ul>
    )
  }

}

Feed.propTypes = {
  posts: PropTypes.array,
  dispatch: PropTypes.func.isRequired,
  errorMessage: PropTypes.string
}