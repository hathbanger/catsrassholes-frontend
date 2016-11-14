import React, { Component, PropTypes } from 'react'
import { uploadFile, createPost } from '../actions'
import CreatePost from '../components/CreatePost'

class CreatePostContainer extends Component {
  
  render() {
    const { dispatch,  isAuthenticated, errorMessage, files } = this.props

    return (
      <div>
        
		<CreatePost
			uploadImage={creds => dispatch(uploadFile(creds)) }
			createPost={ creds => dispatch(createPost(creds)) } 
			dispatch={dispatch} 
			files={files}
		/>
        
      </div>
    )
  }
}

CreatePostContainer.propTypes = {
  	files: PropTypes.array,
  	dispatch: PropTypes.func.isRequired
}


export default CreatePostContainer

