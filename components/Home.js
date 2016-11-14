import React, { Component, PropTypes } from 'react'
import SignUpContainer from '../containers/SignUpContainer'
import CreatePostContainer from '../containers/CreatePostContainer'
import CreatePost from './CreatePost'
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
        <div className="col-md-6 col-md-offset-3">
          {!isAuthenticated &&
            <div>
              <Feed posts={this.props.posts} dispatch={dispatch} />
            </div>          
          }
          {isAuthenticated &&
            <CreatePostContainer dispatch={dispatch} />
          }
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