import React, { Component, PropTypes } from 'react'
import SignUpContainer from '../containers/SignUpContainer'
import CreatePostContainer from '../containers/CreatePostContainer'
import { uploadPost, uploadFile, fetchPosts } from '../actions'
import Feed from './Feed'

export default class Home extends Component {
  componentDidMount(){
    console.log('mounted!')
    let dispatch = this.props.dispatch
    dispatch(fetchPosts())
    console.log("this.props", this.props)
  }

  render() {
    const { dispatch, isAuthenticated, errorMessage, files, posts } = this.props
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6 col-md-offset-3 col-sm-12">
              <div>
                <Feed 
                  posts={this.props.posts} 
                  isAuthenticated={isAuthenticated} 
                  dispatch={dispatch} 
                />
              </div>          
          </div>
        </div>
      </div>
    )
  }
}

Home.propTypes = {
  posts: PropTypes.array,
  dispatch: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string
}


