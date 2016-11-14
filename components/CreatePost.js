import React, { Component, PropTypes } from 'react'
import Uploader from './Uploader'
import { uploadFile } from '../actions'




export default class CreatePost extends Component {

  render() {

    const { dispatch, errorMessage, files } = this.props
    return (
            <div>
                <Uploader dispatch={dispatch} files={files} uploadFile={ (event) => this.addFile(event) }/>
                <input type='text' ref='title' className="form-control" style={{ marginRight: '5px' }} placeholder='Title'/>
                <input type='text' ref='body' className="form-control" style={{ marginRight: '5px' }} placeholder='Body'/>
                <button onClick={(event) => this.handleClick(event)} className="btn btn-primary">
                  Upload
                </button>                
            </div>      
    )
  }
  handleClick(event) {
    console.log("state woo!", this.state)
    const file = this.state.files[0]
    const title = this.refs.title
    const body = this.refs.body
    const creds = { title: title.value.trim(), body: body.value.trim(), file: file }
    this.props.createPost(creds)
  }

  addFile(event) {
    this.setState({
      files: event
    })
    this.props.uploadImage(event)
  }
}

CreatePost.propTypes = {
  files: PropTypes.array,
  dispatch: PropTypes.func.isRequired,
  errorMessage: PropTypes.string
}