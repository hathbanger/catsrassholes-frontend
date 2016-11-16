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



export const FETCH_REQUEST = 'FETCH_REQUEST'
export const FETCH_SUCCESS = 'FETCH_SUCCESS'
export const FETCH_FAILURE = 'FETCH_FAILURE'




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
    return fetch('https://api.catsrassholes.com/login', config)
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
    return fetch('https://api.catsrassholes.com/user', config)
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
    method: 'POST'
  }
  return dispatch => {
    dispatch(requestLike(creds))
    // dispatch(fetchPosts())
    console.log('https://api.catsrassholes.com/post/like/' + creds, config)
    return fetch('https://api.catsrassholes.com/post/like/' + creds, config)
      .then(response =>
        response.json()
        .then(user => ({user, response})))
        .then(({user, response}) => {
          if (!response.ok) {
            console.log("response: ",response)
            dispatch(likeError(response))
            return Promise.reject(response)
          }
          else {
            dispatch(fetchPosts()) 
          }
        })
  }
}

// Uses the API middlware to get a quote
export function deletePost(creds) {
  let config = {
    method: 'POST'
  }
  return dispatch => {
    dispatch(requestLogin(creds))
    // dispatch(fetchPosts())
    console.log('https://api.catsrassholes.com/post/delete/' + creds, config)
    return fetch('https://api.catsrassholes.com/post/delete/' + creds, config)
      .then(response =>
        response.json()
        .then(user => ({user, response})))
        .then(({user, response}) => {
          if (!response.ok) {
            dispatch(likeError(response))
            return Promise.reject(response)
          }
          else {
            dispatch(fetchPosts()) 
          }
        })
  }
}

export function fetchPosts() {
  return dispatch => {
    dispatch(fetchRequest())
    dispatch(postsRequest())
    return fetch('https://api.catsrassholes.com/post/all')
    .then(response => response.json())
      .then(json => {
        if(json.length == 0){
          dispatch(fetchFailure(json))
          console.log('not ok')
        } else {
          dispatch(fetchSuccess(json))
          dispatch(postsSuccess(json.reverse()))
        }
      });
  }
}

function postsRequest(data){
  return {
    type: POST_REQUEST,
    posts: data
  }
}


function postsSuccess(data){
  return {
    type: POST_SUCCESS,
    posts: data
  }
}


function fetchRequest(data){
  return {
    type: FETCH_REQUEST,
    isFetching: true,
    data: data
  }
}

function fetchSuccess(data){
  return {
    type: FETCH_SUCCESS,
    isFetching: false,
    data: data
  }
}

function fetchFailure(message){
  return {
    type: FETCH_REQUEST,
    isFetching: false,
    message
  } 
}



function uploadRequest(data){
  return {
    type: FILE_REQUEST,
    files: data
  }
}

function uploadAction(data){
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
  var data = new FormData()
  data.append('file', post.file)
  data.append('title', post.title)
  data.append('body', post.body)
  let config = {
    method: 'post',
    body: data
  }
  return dispatch => {
    dispatch(uploadAction(post))
    dispatch(fetchRequest(post))
    return fetch('https://api.catsrassholes.com/post/create', config)
    .then(response => {
          if (!response.ok) {
            dispatch(uploadError(response))
            dispatch(fetchFailure(response))
            return Promise.reject(response)
          }
          else {
            dispatch(uploadAction(config))
            dispatch(fetchSuccess(config))
          }
        })
  }
}

