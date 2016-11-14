// The middleware to call the API for quotes
// import { CALL_API } from './middleware/api'

// There are three possible states for our login
// process and we need actions for each of them
// import * as constants from './constants'

export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE'

export const SIGNUP_REQUEST = 'SIGNUP_REQUEST'
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS'
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE'


export const LIKE_REQUEST = 'LIKE_REQUEST'
export const LIKE_SUCCESS = 'LIKE_SUCCESS'
export const LIKE_FAILURE = 'LIKE_FAILURE'



export const FILE_REQUEST = 'FILE_REQUEST'
export const FILE_SUCCESS = 'FILE_SUCCESS'
export const FILE_FAILURE = 'FILE_FAILURE'



export const POST_REQUEST = 'POST_REQUEST'
export const POST_SUCCESS = 'POST_SUCCESS'
export const POST_FAILURE = 'POST_FAILURE'




function requestLogin(creds) {
  return {
    type: LOGIN_REQUEST,
    isFetching: true,
    isAuthenticated: false,
    creds
  }
}

function receiveLogin(user) {
  console.log('user', user)
  return {
    type: LOGIN_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    id_token: user.token,
    username: user
  }
}

function loginError(message) {
  return {
    type: LOGIN_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    message
  }
}


function requestLogout() {
  return {
    type: LOGOUT_REQUEST,
    isFetching: true,
    isAuthenticated: true
  }
}

function receiveLogout() {
  return {
    type: LOGOUT_SUCCESS,
    isFetching: false,
    isAuthenticated: false
  }
}



function requestLike(creds) {
  return {
    type: LIKE_REQUEST,
    isFetching: true,
    isAuthenticated: false,
    creds
  }
}


function likeError(message) {
  return {
    type: LIKE_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    message
  }
}


// Calls the API to get a token and
// dispatches actions along the way
export function loginUser(creds) {
  
  let config = {
    method: 'POST',
    headers: { 'Content-Type':'application/x-www-form-urlencoded' },
    body: `username=${creds.username}&password=${creds.password}`
  }
  
  return dispatch => {
    // We dispatch requestLogin to kickoff the call to the API
    dispatch(requestLogin(creds))
    return fetch('http://api.catsrassholes.com/login', config)
      .then(response =>
        response.json()
        .then(user => ({ user, response }))
      ).then(({ user, response }) =>  {
        if (!response.ok) {
          // If there was a problem, we want to
          // dispatch the error condition
          dispatch(loginError(user.message))
          return Promise.reject(user)
        }
        else {
          // If login was successful, set the token in local storage
          localStorage.setItem('id_token', user.auth_token)
          // console.log("user token: ", user)
          
          // Dispatch the success action
          dispatch(receiveLogin(user))
        }
      }).catch(err => console.log("Error: ", err))
  }
}

// Logs the user out
export function logoutUser() {
  return dispatch => {
    dispatch(requestLogout())
    localStorage.removeItem('id_token')
    dispatch(receiveLogout())
  }
}


// Calls the API to get a token and
// dispatches actions along the way
export function signUp(creds) {
  
  let config = {
    method: 'POST',
    headers: { 'Content-Type':'application/x-www-form-urlencoded' },
    body: `username=${creds.username}&password=${creds.password}`
  }
  
  return dispatch => {
    // We dispatch requestLogin to kickoff the call to the API
    dispatch(requestLogin(creds))
    return fetch('http://api.catsrassholes.com/user', config)
      .then(response =>
        response.json()
        .then(user => ({ user, response }))
      ).then(({ user, response }) =>  {
        if (!response.ok) {
          // If there was a problem, we want to
          // dispatch the error condition
          dispatch(loginError(user.message))
          return Promise.reject(user)
        }
        else {
          // If login was successful, set the token in local storage
          localStorage.setItem('id_token', user.auth_token)
          // console.log("user token: ", user)
          
          // Dispatch the success action
          dispatch(receiveLogin(user))
        }
      }).catch(err => console.log("Error: ", err))
  }
}




function updateState(connection){
  console.log("LIKING PICTURE WITH ID:", connection.pic_id)
  return {
    type: LIKE_SUCCESS,
    connection: connection
  }
}

// Uses the API middlware to get a quote
export function likePost(creds) {
  let config = {
    method: 'POST',
    headers: { 'Content-Type':'application/x-www-form-urlencoded' },
    body: `post_id=${creds.post_id}}`
  }

  return dispatch => {
    dispatch(requestLogin(creds))

    return fetch('http://localhost:1323/', config)
      .then(response =>
        response.json()
        .then(user => ({user, response})))
        .then(({user, response}) => {
          if (!response.ok) {
            dispatch(likeError(like.message))
            return Promise.reject(like)
          }
          else {
            dispatch 
          }
        })
    dispatch(updateState(creds))
  }
}

export function fetchPosts() {
  return dispatch => {
    dispatch(postsRequest())
    return fetch('http://localhost:1323/post/all')
    .then(response => response.json())
      .then(json => {
        console.log(json);
        dispatch(postsSuccess(json))
      });
  }
}

function postsRequest(data){
  console.log('data', data)
  return {
    type: POST_REQUEST,
    posts: data
  }
}


function postsSuccess(data){
  console.log('data', data)
  return {
    type: POST_SUCCESS,
    posts: data
  }
}




function uploadRequest(data){
  console.log('data', data)
  return {
    type: FILE_REQUEST,
    files: data
  }
}

function uploadAction(data){
  console.log("Uploading File:", data)
  return {
    type: FILE_SUCCESS,
    files: data
  }
}

function uploadError(file){
  return {
    type: FILE_FAILURE
  }
}


export function uploadFile(file) {
  return dispatch => {
    dispatch(uploadRequest(file))
  }
}


export function createPost(post) {
  console.log('upload file!', post)
  var data = new FormData()
  data.append('file', post.file)
  data.append('title', post.title)
  data.append('body', post.body)
  console.log(data)
  let config = {
    method: 'post',
    body: data
  }
  return dispatch => {
    dispatch(uploadAction(post))
    return fetch('http://localhost:1323/post/create', config)
    .then(response => {
          if (!response.ok) {
            dispatch(uploadError(response))
            return Promise.reject(response)
          }
          else {
            dispatch(uploadAction(config))
            console.log('success!') 
          }
        })
  }
}

