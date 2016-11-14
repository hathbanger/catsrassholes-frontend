import React, { Component, PropTypes } from 'react'
import FeedItem from './FeedItem'
import catPics from '../catPics'


export default class Feed extends Component {
  render() {
    const { dispatch, errorMessage, posts } = this.props
    let woo = this.props
    console.log('this.props.posts', this.props.posts)
    const self = this
    return (
        <ul className="list-group">
        {this.props.posts ? &&
          {catPics.map(function(pic, index){
            return <FeedItem dispatch={dispatch} key={ index } feedItem={pic} />
          })}
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