import React, { Component, PropTypes } from 'react'

export default class SocialBar extends Component {
  
  render() {
    const { dispatch, errorMessage } = this.props

    return (
            <div>
              
            </div>

    )
  }

}

SocialBar.propTypes = {
  dispatch: PropTypes.func.isRequired,
  errorMessage: PropTypes.string
}
