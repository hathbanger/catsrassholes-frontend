import React, { Component, PropTypes } from 'react'
import FeedItem from './FeedItem'
import catPics from './catPics'


export default class Feed extends Component {
  render() {
    const { dispatch, errorMessage } = this.props
    return (
        <ul className="list-group">
          {catPics.map(function(pic, index){
            return <FeedItem dispatch={dispatch} key={ index } feedItem={pic} />
          })}
        </ul>
    )
  }

}

Feed.propTypes = {
  dispatch: PropTypes.func.isRequired,
  errorMessage: PropTypes.string
}