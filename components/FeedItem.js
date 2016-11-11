import React, { Component, PropTypes } from 'react'

export default class FeedItem extends Component {
  
  render() {
    const { dispatch, errorMessage } = this.props

    return (
            <div>
              <li className="list-group-item">
                <div className="row">
                <h5>{this.props.feedItem.body}</h5>
                <small className="pull-md-right">{this.props.feedItem.body}</small>
                </div>
                <div className="row text-md-center">
                  <img  className="img-thumbnail" src={this.props.feedItem.pic} />
                </div>
                <p>{this.props.feedItem.body}</p>
              </li>
            </div>

    )
  }

}

FeedItem.propTypes = {
  dispatch: PropTypes.func.isRequired,
  errorMessage: PropTypes.string
}
