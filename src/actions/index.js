const baseURL = 'http://localhost:8000/'

export const SET_MAP_LOCATION = 'SET_MAP_LOCATION'
export const setMapLocation = (locationObj) => {

  return dispatch => {

    dispatch({
      type: SET_MAP_LOCATION,
      payload: locationObj
    })
  }

}

export const RESET_MAP_LOCATION = 'RESET_MAP_LOCATION'
export const resetMapLocation = () => {
  return dispatch => {

    dispatch({
      type: RESET_MAP_LOCATION
      
    })
  }
}

export const INPUT_SEARCH = 'INPUT_SEARCH'
export const inputSearch = content => {
  return dispatch => {

    dispatch({
      type: INPUT_SEARCH,
      payload: content
    }) 
  }
}

export const SEARCH_RESULTS_RECEIVED = 'SEARCH_RESULTS_RECEIVED'
export const search = (searchString, location) => {
 
  const access_token = "2bHIcYMU5Xn4FID8LCBYABCEwu7AhxhfmgsFYBr2ioT0x8Cml9Pi3gEFnok-xHnYNylTqj_7FKyRaXcZrpjayTnrtiosCiE7QdqOV8KSQeFgBNtUSoe5tY6kBDcKWnYx";
  return async dispatch => {

  const response = await fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${searchString}+restaurant&location=${location}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${access_token}`
      }}) 
    
    const JSONres = await response.json()

    dispatch({
      type: SEARCH_RESULTS_RECEIVED,
      payload: JSONres.businesses
    })
  }
}

export const ADD_FAVORITE = 'ADD_FAVORITE'
export const addFavoriteAndRestaurant = (user_id, restaurant) => {
  return async dispatch => {

    const response = await fetch(`${process.env.REACT_APP_API_URL}/restaurants`, {
      method: 'POST',
      body: JSON.stringify(restaurant),
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json'
      }
    })

    const JSONres = await response.json()

    let obj = {user_id, restaurant_id: JSONres[0].id}

    const responseB = await fetch(`${process.env.REACT_APP_API_URL}/favorite`, {
      method: 'POST',
      body: JSON.stringify(obj),
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json'
      }
    })

      dispatch({
        type: ADD_FAVORITE,
        payload: JSONres[0]
      })
  }
}

export const addFavorite = (user_id, restaurant_id) => {
  return async dispatch => {
    let obj = {user_id, restaurant_id}

    const response = await fetch(`${process.env.REACT_APP_API_URL}/favorite`, {
      method: 'POST',
      body: JSON.stringify(obj),
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json'
      }
    })

    const JSONres = await response.json()

      dispatch({
        type: ADD_FAVORITE,
        payload: JSONres[0]
      })
  }
}

export const DELETE_FAVORITE = 'DELETE_FAVORITE'
export const deleteUserFavorite = ( userRestaurantObj, token ) => {

  console.log('TTTTTOOOOOOOO++++++ toekn deleteUserFav in ac', token)
  return async dispatch => {
     const response = await fetch(`${process.env.REACT_APP_API_URL}/favorite`, {
       method: 'DELETE',
       body: JSON.stringify(userRestaurantObj),
       headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json',
        'authorization': token
      }
     })

     dispatch({
       type: DELETE_FAVORITE,
       payload: Number( userRestaurantObj.restaurant_id )
     })

  }
}

export const UPDATE_FAVORITES = 'UPDATE_FAVORITES'
export const updateUserFavorites = (user_id, restaurant_id) => {
  const obj = {user_id, restaurant_id}

  return async dispatch => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/favorite`, {
      method: 'POST',
      body: JSON.stringify(obj),
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json'
      }
    })

    dispatch({
      type: UPDATE_FAVORITES
    })
  }

}


export const LATEST_FIRST = 'LATEST_FIRST'
export const OLDEST_FIRST = 'OLDEST_FIRST'
export const All_RESTAURANTS = 'All_RESTAURANTS'
export const sortByTime = (filter) => {
  
  return dispatch => {

    if(filter === 'latestFirst') {
      dispatch({
        type: LATEST_FIRST
      })
    } else if (filter === 'oldestFirst') {
      dispatch({
        type: OLDEST_FIRST
      })
    } else {
      dispatch({
        type: All_RESTAURANTS
      })
    }
  }
}

export const GET_USER_INFO = 'GET_USER_INFO'
export const getUserInfo = (username) => {

  return async dispatch => {

    const response = await fetch(`${process.env.REACT_APP_API_URL}/users/${username}` , {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json'
      }
    })

    const JSONres = await response.json()
   
    dispatch({
      type: GET_USER_INFO,
      payload: JSONres[0]
    })
  }
}


export const GET_DISPLAY_USER = 'GET_DISPLAY_USER'
export const getDisplayUser = (username) => {

  console.log('username in getDisplayUser in action+++++++', username)
  return async dispatch => {

    const response = await fetch(`${process.env.REACT_APP_API_URL}/users/${username}` , {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json'
      }
    })

    const JSONres = await response.json()
  
    dispatch({
      type: GET_DISPLAY_USER,
      payload: JSONres[0]
    })
  }
  
}

export const UPDATE_USER_INFO = 'UPDATE_USER_INFO'
export const updateUserInfo = (updatedInfo, username) => {

  return async dispatch => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/users/${username}`, {
      method: 'PATCH',
      body: JSON.stringify(updatedInfo),
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json'
      }
    })

    const JSONres = await response.json()
    console.log('JSONres in updateUserInfo action', JSONres)
    
    dispatch({
      type: UPDATE_USER_INFO,
      payload: JSONres[0]

    })

  }

}

export const GET_ALL_RESTAURANTS =' GET_ALL_RESTAURANTS'
export const getAllRestaurants = () => {
  return async dispatch => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/restaurants`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json'
      }
    })

    const JSONres = await response.json()

    dispatch({
      type: GET_ALL_RESTAURANTS,
      payload: JSONres
    })

  }
}

export const RECEIVE_USER_RESTAURANTS = 'RECEIVE_USER_RESTAURANTS'
export const getUserRestaurants = (userId) => {

  return async dispatch => {
    
    const response = await fetch(`${process.env.REACT_APP_API_URL}/favorite/${userId}`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json'
      }
    })

    const JSONres = await response.json()

    dispatch({
      type: RECEIVE_USER_RESTAURANTS,
      payload: JSONres
    })
  }
}

export const GET_RESTAURANT = 'GET_RESTAURANT'
export const getRestaurant = (restaurant_id) => {
  return async dispatch => {

    const response = await fetch(`${process.env.REACT_APP_API_URL}/restaurants/${restaurant_id}`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json'
      }
    })

    const JSONres = await response.json()
  
    dispatch({
      type: GET_RESTAURANT,
      payload: JSONres[0]
    })
  }
}

export const RECEIEVE_ALL_REVIEWS = 'RECEIEVE_ALL_REVIEWS'
export const getAllReviews = () => {
  return async dispatch => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/reviews/`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json'
      }
    })

    const JSONres = await response.json()

    dispatch({
      type: RECEIEVE_ALL_REVIEWS,
      payload: JSONres
    })
  }
}

export const GET_REVIEW = 'GET_REVIEW'
export const getCurrentReview = (reviewId) => {
  return async dispatch => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/reviews/${reviewId}`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json'
      }
    })

    const JSONres = await response.json()

    dispatch({
      type: GET_REVIEW,
      payload: JSONres
    })
  }
}


export const UPDATE_REVIEW = 'UPDATE_REVIEW'
export const updateReview = (reviewObj, review_id) => {

  return async dispatch => {

    const response = await fetch(`${process.env.REACT_APP_API_URL}/reviews/${review_id}`, {
      method: 'PATCH',
      body: JSON.stringify(reviewObj),
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json'
      }
    })

    dispatch({
      type: UPDATE_REVIEW
    })
  }
}

export const DELETE_REVIEW = 'DELETE_REVIEW'
export const deleteReview = review_id =>{
  
  return async dispatch => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/reviews/${review_id}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json'
      }
    })

    dispatch({
      type: DELETE_REVIEW,
      payload: Number(review_id)
    })

  }

  
}

export const INPUT_NAME = 'INPUT_NAME'
export const inputName = name => {

  return dispatch => {

    dispatch({
      type: INPUT_NAME,
      payload: name
    })
  }
}

export const INPUT_USERNAME = 'INPUT_USERNAME'
export const inputUsername = username => {
  return dispatch => {

    dispatch({
      type: INPUT_USERNAME,
      payload: username
    })
  }
}

export const INPUT_EMAIL = 'INPUT_EMAIL'
export const inputEmail = email => {
 
  return dispatch => {

    dispatch({
      type: INPUT_EMAIL,
      payload: email
    })
  }
}

export const INPUT_PASSWORD = 'INPUT_PASSWORD'
export const inputPassword = password => {
  return dispatch => {

    dispatch({
      type: INPUT_PASSWORD,
      payload: password
    })
  }
}

export const INPUT_VERIFY_PASSWORD = 'INPUT_VERIFY_PASSWORD'
export const inputVerifyPassword = password => {
  return dispatch => {

    dispatch({
      type: INPUT_VERIFY_PASSWORD,
      payload: password
    })
  }
}

export const SIGN_UP = 'SIGN_UP'
export const signup = userObj => {

    return async dispatch => {

      const response = await fetch(`${process.env.REACT_APP_API_URL}/signup`, {
        method: 'POST',
        body: JSON.stringify(userObj),
        headers: {
          'Content-type': 'application/json',
          'Accept': 'application/json'
        }
      })

      dispatch({
        type: SIGN_UP,
        payload: userObj
      })
    }
}

export const INPUT_LOGIN_EMAIL = 'INPUT_LOGIN_EMAIL'
export const inputLoginEmail = email => {
  
  return dispatch => {

    dispatch({
      type: INPUT_LOGIN_EMAIL,
      payload: email
    })
  }
}

export const INPUT_LOGIN_PASSWORD = 'INPUT_LOGIN_PASSWORD'
export const inputLoginPassword = password => {
  return dispatch => {

    dispatch({
      type: INPUT_LOGIN_PASSWORD,
      payload: password
    })
  }
}

export const CHECK_LOGIN = 'CHECK_LOGIN'
export const checkLogin = (email, password) => {

  const obj = { email, password }

  return async dispatch => {

    const response = await fetch(`${process.env.REACT_APP_API_URL}/login`, {
    method: 'POST',
    body: JSON.stringify(obj),
    headers: {
      'Content-type': 'application/json',
      'Accept': 'application/json'
    }
  })

   const JSONres = await response.json()

  if(!JSONres.error) {
    localStorage.setItem("authorization", JSON.stringify(JSONres))
  }
  


    dispatch({
      type: CHECK_LOGIN,
      payload: JSONres
    })
  }
}

export const UPDATE_VOTES = 'UPDATE_VOTES'
export const vote = (review_id, currentVote, status) => {
  
  return async dispatch => {
   
    const updatedVotes = status === 'Thumbs Up'? currentVote + 1: currentVote -1
      
      const response = await fetch(`${process.env.REACT_APP_API_URL}/votes/${review_id}`, {
        method: 'PATCH',
        body: JSON.stringify({updatedVotes}),
        headers: {
          'Content-type': 'application/json',
          'Accept': 'application/json'
        }
      })
      const JSONres = await response.json()

      dispatch({
      type: UPDATE_VOTES,
      payload: JSONres[0]
    })
  }
}

export const addReview = reviewObj => {

  return async dispatch => {

    const repsonse = await fetch(`${process.env.REACT_APP_API_URL}/reviews`, {
      method: 'POST',
      body: JSON.stringify(reviewObj),
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json'
      }
    })
  }
}

export const ADD_FOLLOW_PAIR = 'ADD_FOLLOW_PAIR'
export const addFollowPair = (followed_id, follower_id) => {

  console.log('FFFFFFOOOOOO', followed_id, follower_id)
  return async dispatch => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/follow`, {
      method: 'POST',
      body: JSON.stringify({followed_id, follower_id}),
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json'
      }
    })
  }
}

export const GET_FOLLOWED_USERS = 'GET_FOLLLOWED_USERS'
export const FOLLOWED = 'FOLLOWED'
export const getFollowedUsers = (purpose, follower_id) => {
  console.log('FOOOOOOOID in action GET FOLLOWED', follower_id)
  return async (dispatch, getState) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/follow/${follower_id}`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json'
      }
    })

    const { displayUser } = getState()

    const JSONres = await response.json()

    if(purpose === 'displayPage') {
      dispatch({
        type: GET_FOLLOWED_USERS,
        payload: JSONres
      })
    } else if (purpose === 'decidedFollow' ) {

      console.log('DEcidedfollow in action XXXXXXX', purpose)

      console.log('JJJJJJJJJJJJNNNNNNNNNNNNNNNNNN',JSONres)
      console.log('DISSSSSSSSPPPPPPPPPPPPPP', displayUser.id)
      const filterdUsers = JSONres.filter(user => {
        console.log('USERRRRRRRRR%%%%%%%% in action', user)
        return user.followed_id === displayUser.id
      } )

      if(filterdUsers.length > 0) {
        dispatch({
          type: FOLLOWED
        })
      }
    }  
  }
}

export const UNFOLLOW = 'UNFOLLOW'
export const deleteFollowPair = (followed_id, follower_id) => {
  const obj = {followed_id, follower_id}
  return async dispatch => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/follow`, {
      method: 'DELETE',
      body: JSON.stringify(obj),
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json'
      }
    })

    dispatch({
      type: UNFOLLOW
    })
  }

}