import React, { Component, PropTypes } from 'react'
import Octicon from 'react-octicon'

export default class SocialBar extends Component {
  
  render() {
    const { dispatch, errorMessage } = this.props

    return (
            <div>
                <button type="button" onClick={(event) => this.handleClick(event)} className="btn btn-secondary">
                  <Octicon mega name="heart"/>
                </button>
            </div>

    )
  }

  handleClick(event) {
    console.log(this.props)
    // const username = this.refs.username
    // const password = this.refs.password
    const creds = { pic_id: this.props.pic_id }
    this.props.onClickLike(creds)
  }


}


SocialBar.propTypes = {
  onClickLike: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  errorMessage: PropTypes.string
}
