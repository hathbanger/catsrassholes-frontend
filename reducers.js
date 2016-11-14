import { combineReducers } from 'redux'
import { 
  LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_SUCCESS, FILE_SUCCESS, POST_SUCCESS
} from './actions'

// The auth reducer. The starting state sets authentication
// based on a token being in local storage. In a real app,
// we would also want a util to check if the token is expired.
function auth(state = {
    isFetching: false,
    isAuthenticated: localStorage.getItem('id_token') ? true : false
  }, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
    console.log('login request', action)
      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: false,
        user: action.creds.username
      })
    case LOGIN_SUCCESS:
    console.log('login success', action)
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: true,
        username: action.username,
        errorMessage: ''
      })
    case LOGIN_FAILURE:

      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: false,
        errorMessage: action.message
      })
    case LOGOUT_SUCCESS:
      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: false
      })
    default:
      return state
    }
}
// The auth reducer. The starting state sets authentication
// based on a token being in local storage. In a real app,
// we would also want a util to check if the token is expired.
function upload(state = {
    files: null
  }, action) {
  switch (action.type) {
    case FILE_SUCCESS:
    console.log('upload', action)
      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: false,
        files: action
      })
    default:
      return state
    }
}

// The auth reducer. The starting state sets authentication
// based on a token being in local storage. In a real app,
// we would also want a util to check if the token is expired.
function postFetch(state = {
    posts: null
  }, action) {
  switch (action.type) {
    case POST_SUCCESS:
    console.log('posts', action)
      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: false,
        posts: action.posts
      })
    default:
      return state
    }
}

// We combine the reducers here so that they
// can be left split apart above
const userLogin = combineReducers({
  auth,
  upload,
  postFetch
})

export default userLogin