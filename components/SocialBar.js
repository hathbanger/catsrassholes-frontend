import React, { Component, PropTypes } from 'react'
import Octicon from 'react-octicon'

export default class SocialBar extends Component {
  
  render() {
    const { dispatch, errorMessage, isAuthenticated } = this.props

    return (
            <div>
                <button type="button" onClick={(event) => this.handleLikeClick(event)} className="btn btn-secondary">
                  <Octicon mega name="heart"/>
                </button>
              {isAuthenticated &&
                <button type="button" onClick={(event) => this.handleDeleteClick(event)} className="btn btn-secondary">
                  <Octicon mega name="x"/>
                </button>
              }
            </div>

    )
  }

  handleLikeClick(event) {
    const creds = { pic_id: this.props.pic_id }
    this.props.onClickLike(this.props.pic_id)
  }

  handleDeleteClick(event) {
    const creds = { pic_id: this.props.pic_id }
    this.props.onClickDelete(this.props.pic_id)
  }


}


SocialBar.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  onClickDelete: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  errorMessage: PropTypes.string
}
