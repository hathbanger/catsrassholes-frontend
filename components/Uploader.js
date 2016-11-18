import React, { Component, PropTypes } from 'react'
import Dropzone from 'react-dropzone'




export default class Uploader extends Component {

  onDrop (acceptedFiles) {
    this.props.uploadFile(acceptedFiles)
  }

  onOpenClick () {
    this.dropzone.open();
  }

  render() {

    const { dispatch, errorMessage, files } = this.props
    return (
            <div>
            
                <Dropzone ref={(node) => { this.dropzone = node; }}  onDrop={(event) => this.onDrop(event)}>
                    <div>Try dropping some files here, or click to select files to upload.</div>
                </Dropzone>              
            </div>      
    )
  }
}

Uploader.propTypes = {
  files: PropTypes.array,
  dispatch: PropTypes.func.isRequired,
  errorMessage: PropTypes.string
}