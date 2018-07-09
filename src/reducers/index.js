import { combineReducers } from 'redux'
import { 
         INPUT_SEARCH, 
         SEARCH_RESULTS_RECEIVED, 
         ADD_FAVORITE, 
         DELETE_FAVORITE,
         GET_USER_INFO, 
         GET_DISPLAY_USER,
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
         GET_REVIEW,
         UPDATE_REVIEW,
         DELETE_REVIEW,
         UPDATE_VOTES,
         GET_RESTAURANT,
         GET_ALL_RESTAURANTS,
         UPDATE_USER_INFO,
         FILTER_RESTAURANTS,
         SET_MAP_LOCATION,
         RESET_MAP_LOCATION,
         LATEST_FIRST,
         OLDEST_FIRST,
         All_RESTAURANTS,
         GET_FOLLOWED_USERS,
         FOLLOWED,
         UNFOLLOW,
         SIGN_UP
       } from '../actions'

const mapLocation = (state = {coordinates: { lat: 37.0902, lng: -95.7129}, zoom: 4}, action) => {
  switch(action.type) {
    case SET_MAP_LOCATION:
    return({
      ...state,
      coordinates: action.payload,
      zoom: 12
    })
    case RESET_MAP_LOCATION:
      return({
        ...state,
        coordinates: { lat: 37.0902, lng: -95.7129},
        zoom: 4
      })
    default:
      return state
  }
}

const search = (state = {content: '', businesses: []}, action) => {
  switch(action.type) {
    
    case INPUT_SEARCH:
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
      return ({
        ...state,
        restaurants: action.payload
      })
    case ADD_FAVORITE:
      return ({
        ...state,
        restaurants: [...state.restaurants, action.payload]
      })
    case DELETE_FAVORITE:
      const favorite = state.restaurants
      const updatedFavoriteList = favorite.filter(restaurant => restaurant.restaurant_id !== action.payload )
      return ({
        ...state,
        restaurants: updatedFavoriteList
      })
    case LATEST_FIRST:
      const restaurantsA = state.restaurants.filter(restaurant => restaurant.review)
      const sortedRestaurantsA = restaurantsA.sort((a,b) => {
        return a.review.created_at < b.review.created_at
      })

      return ({
        ...state,
        restaurants: sortedRestaurantsA
      })
    case OLDEST_FIRST:
      const restaurantsB = state.restaurants.filter(restaurant => restaurant.review)
      const sortedRestaurantsB = restaurantsB.sort((a,b) => {
        return a.review.created_at > b.review.created_at
      })

      return ({
        ...state,
        restaurants: sortedRestaurantsB
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
    case UPDATE_REVIEW:
      return ({
        ...state,
        currentReview: action.payload[0]
      })
    case UPDATE_VOTES:
      return ({
        ...state,
        currentReview: action.payload
      })
    case DELETE_REVIEW:
      const reviews = state.reviews
      const updatedReviewLIst = reviews.filter(review => review.id !== action.payload)
      return ({
        ...state,
        reviews: updatedReviewLIst
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
      case UPDATE_USER_INFO:
      const newObj = action.payload
      return {
        ...state,
            id: newObj.id,
            username: newObj.username,
            name: newObj.name,
            email: newObj.email,
            password: newObj.password,
            bio: newObj.bio,
            profile_pic: newObj.profile_pic
        }
      default: 
        return state
      }
  }

  const displayUser = (state = {
    id: 0,
    username: '',
    name: '',
    email: '',
    password: '',
    bio: '',
    profile_pic: ''
  }, action) => {
    switch(action.type) {
      
      case GET_DISPLAY_USER:
      const newObj = action.payload
         return {
           ...state,
            id: newObj.id,
            username: newObj.username,
            name: newObj.name,
            email: newObj.email,
            password: newObj.password,
            bio: newObj.bio,
            profile_pic: newObj.profile_pic
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

  const checkUser = (state = {errorMessage: null }, action) => {
      switch(action.type) {
        case SIGN_UP:
          return {
            ...state,
            errorMessage: action.payload
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
        return {
          ...state,
          isError: action.payload.error? true: false
        }
      default:
        return state
    }
  }

  const restaurants = (state = { currentRestaurant: {}, allRestaurants: []}, action) => {
    switch(action.type) {
      case GET_RESTAURANT:
      return {
        ...state,
        currentRestaurant: action.payload

      }
      case GET_ALL_RESTAURANTS:
        return {
          ...state,
          allRestaurants: action.payload

        }
      default:
        return state
    }
  }

  const follow = (state = {followedUsers: [], isFollowed: false}, action) => {
    switch(action.type) {
      case GET_FOLLOWED_USERS:
        return {
          ...state,
          followedUsers: action.payload
        }
      case FOLLOWED:
        return {
          ...state,
          isFollowed: true
        }
      case UNFOLLOW:
      return {
        ...state,
        isFollowed: false
      }
      default:
        return state
    }
  }

export default combineReducers({
  search,
  favorites,
  currentUser,
  displayUser,
  reviews,
  signup,
  checkUser,
  login,
  restaurants,
  mapLocation,
  follow
})