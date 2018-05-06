import { combineReducers } from 'redux'
import { FETCH_LOCATION, 
         INPUT_SEARCH, 
         SEARCH_RESULTS_RECEIVED, 
         ADD_FAVORITE, 
         GET_USER_INFO, 
         RECEIVE_USER_RESTAURANTS, 
         RECEIEVE_ALL_REVIEWS,
         INPUT_NAME,
         INPUT_USERNAME,
         INPUT_EMAIL,
         INPUT_PASSWORD,
         INPUT_VERIFY_PASSWORD,
         INPUT_LOGIN_EMAIL,
         INPUT_LOGIN_PASSWORD,
         CHECK_LOGIN,
         GET_REVIEW
       } from '../actions'

const location = (state = {coordinates: { lat: 0, lng: 0 }}, action) => {
    switch(action.type) {
      case FETCH_LOCATION:
      console.log('>>>>>>>', action.payload)
        return ({
          ...state,
          coordinates: action.payload
        })
      default:
        return state
    }

}

const search = (state = {content: '', businesses: []}, action) => {
  switch(action.type) {
    
    case INPUT_SEARCH:
    console.log('aaaaaaa', action.type)
      return ({
        ...state,
        content: action.payload
      })
    case SEARCH_RESULTS_RECEIVED:
      return ({
        ...state,
        businesses: action.payload
      })
    default:
      return state
  }
}

const favorites = (state = {restaurants: []}, action) => {
  switch(action.type) {

    case RECEIVE_USER_RESTAURANTS:
    console.log('action.paylaod favorite', action.payload)
      return ({
        ...state,
        restaurants: action.payload
      })
    case ADD_FAVORITE:
    console.log('payloaddddd', action.payload)
      return ({
        ...state,
        restaurants: [...state.restaurants, action.payload]
      })
    default:
      return state
  }
}

const reviews = (state = {reviews: [], currentReview: {}}, action) => {
  switch(action.type) {
    case RECEIEVE_ALL_REVIEWS:
      return ({
        ...state,
        reviews: action.payload
      })
    case GET_REVIEW:
      return ({
        ...state,
        currentReview: action.payload[0]
      })
    
  default:
    return state
  }
}

const currentUser = (state = {
  id: 0,
  username: '',
  name: '',
  email: '',
  password: '',
  bio: '',
  profile_pic: ''
}, action) => {
  switch(action.type) {
    case GET_USER_INFO:
      const obj = action.payload
      return {
        ...state,
            id: obj.id,
            username: obj.username,
            name: obj.name,
            email: obj.email,
            password: obj.password,
            bio: obj.bio,
            profile_pic: obj.profile_pic
        }
      default: 
        return state
      }
  }

  const signup = (state= {
    name: '',
    username: '',
    email: '',
    password: '',
    verifypassword: ''
  }, action) => {
    switch(action.type){
      case INPUT_NAME:
        return {
          ...state,
          name: action.payload
        }
      case INPUT_USERNAME:
        return {
          ...state,
          username: action.payload
        }
      case INPUT_EMAIL:
      return {
        ...state,
        email: action.payload
      }
      case INPUT_PASSWORD:
        return {
          ...state,
          password: action.payload
        }
      case INPUT_VERIFY_PASSWORD:
      return {
        ...state,
        verifypassword: action.payload
      }
      default:
        return state
    }
  }

  const login = (state = {email: '', password: '', isError: false}, action) => {
    switch(action.type) {
      case INPUT_LOGIN_EMAIL:
        return {
          ...state,
          email: action.payload
        }
      case INPUT_LOGIN_PASSWORD:
        return {
          ...state,
          password: action.payload
        }
      case CHECK_LOGIN:
      console.log('action in login reducer', action)
        return {
          ...state,
          isError: action.payload.error? true: false
        }
      default:
        return state
    }
  }

  const loggedInUser = () => {

  }


export default combineReducers({
  location,
  search,
  favorites,
  currentUser,
  reviews,
  signup,
  login
})