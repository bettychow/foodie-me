const baseURL = 'http://localhost:8000/'


export const FETCH_LOCATION = 'FETCH_LOCATION'
export const fetchLocation = () => {
  return dispatch => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } 

    function showPosition (position) {
      console.log( 'kkkkkk', typeof position.coords.latitude, position.coords.longitude)
      const coordinates = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      }

      dispatch({
        type: FETCH_LOCATION,
        payload: coordinates
      })
    }
  }
}

export const INPUT_SEARCH = 'INPUT_SEARCH'
export const inputSearch = content => {
console.log('cccc', content)
  return dispatch => {

    dispatch({
      type: INPUT_SEARCH,
      payload: content
    }) 
  }
}

export const SEARCH_RESULTS_RECEIVED = 'SEARCH_RESULTS_RECEIVED'
export const search = (searchString) => {
 
  const access_token = "2bHIcYMU5Xn4FID8LCBYABCEwu7AhxhfmgsFYBr2ioT0x8Cml9Pi3gEFnok-xHnYNylTqj_7FKyRaXcZrpjayTnrtiosCiE7QdqOV8KSQeFgBNtUSoe5tY6kBDcKWnYx";
  return async dispatch => {

  const response = await fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${searchString}+restaurant&location=cupertino`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${access_token}`,
      }}) 
    
    const JSONres = await response.json()

    console.log('uuuuu', JSONres)

    dispatch({
      type: SEARCH_RESULTS_RECEIVED,
      payload: JSONres.businesses
    })
  }
}

export const ADD_FAVORITE = 'ADD_FAVORITE'
export const addToFavorite = (user_id, restaurant) => {
  
  return async dispatch => {
    console.log('restaurant in action', restaurant)

    const response = await fetch(`http://localhost:8000/restaurants`, {
      method: 'POST',
      body: JSON.stringify(restaurant),
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json'
      }
    })

    const JSONres = await response.json()

    console.log('JSONres in addToFavorite in action', JSONres)

    let obj = {user_id, restaurant_id: JSONres[0].id}

    console.log('objjjjjjj', obj)

    const responseB = await fetch(`http://localhost:8000/favorite`, {
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

export const UPDATE_FAVORITES = 'UPDATE_FAVORITES'
export const updateUserFavorites = (user_id, restaurant_id) => {
  const obj = {user_id, restaurant_id}
console.log('obj in updateUserFavorites in action', obj)
  return async dispatch => {
    console.log('=+++++++++++', obj)
    const response = await fetch(`http://localhost:8000/favorite`, {
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

export const GET_USER_INFO = 'GET_USER_INFO'
export const getUserInfo = (username) => {

  console.log('username in getUserinfo action', username)
  return async dispatch => {

      const response = await fetch(`http://localhost:8000/users/${username}` , {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          'Accept': 'application/json'
        }
      })

      const JSONres = await response.json()
      console.log('JSONres in getUserInfo', JSONres)
      
      dispatch({
        type: GET_USER_INFO,
        payload: JSONres[0]
      })
  }
}

export const UPDATE_USER_INFO = 'UPDATE_USER_INFO'
export const updateUserInfo = (updatedInfo, username) => {
console.log('////////', updatedInfo, username)
  return async dispatch => {
    const response = await fetch(`http://localhost:8000/users/${username}`, {
      method: 'PATCH',
      body: JSON.stringify(updatedInfo),
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json'
      }
    })

    const JSONres = await response.json()
    console.log('JSONres in updateUserInfo', JSONres)
    
    dispatch({
      type: UPDATE_USER_INFO,
      payload: JSONres[0]

    })

  }

}

export const RECEIVE_USER_RESTAURANTS = 'RECEIVE_USER_RESTAURANTS'
export const getUserRestaurants = (userId) => {

  console.log('eeeeeeeeee', userId)
  return async dispatch => {
    console.log('userId in getUserRestaurants in action ========>', userId)
    const response = await fetch(`http://localhost:8000/favorite/${userId}`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json'
      }
    })

    const JSONres = await response.json()

    console.log('kkkkkk', JSONres)

    dispatch({
      type: RECEIVE_USER_RESTAURANTS,
      payload: JSONres
    })
  }
}

export const GET_RESTAURANT = 'GET_RESTAURANT'
export const getRestaurant = (restaurant_id) => {
  return async dispatch => {

    const response = await fetch(`http://localhost:8000/restaurants/${restaurant_id}`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json'
      }
    })

    const JSONres = await response.json()
    
    console.log('JSONres in getRestaurant in action', JSONres)
    dispatch({
      type: GET_RESTAURANT,
      payload: JSONres[0]
    })
  }
}

export const RECEIEVE_ALL_REVIEWS = 'RECEIEVE_ALL_REVIEWS'
export const getAllReviews = () => {
  return async dispatch => {
    const response = await fetch(`http://localhost:8000/reviews/`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json'
      }
    })

    const JSONres = await response.json()
console.log('JOSONres in getAllReviews', JSONres)
    dispatch({
      type: RECEIEVE_ALL_REVIEWS,
      payload: JSONres
    })
  }
}

export const GET_REVIEW = 'GET_REVIEW'
export const getCurrentReview = (reviewId) => {
  console.log("%%$#@@@@@@", reviewId)
  return async dispatch => {
    const response = await fetch(`http://localhost:8000/reviews/${reviewId}`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json'
      }
    })

    const JSONres = await response.json()
console.log('JOSONres in getCurrent Review Action', JSONres)
    dispatch({
      type: GET_REVIEW,
      payload: JSONres
    })
  }
}


export const UPDATE_REVIEW = 'UPDATE_REVIEW'
export const updateReview = (reviewObj) => {

  console.log('reviewObj in action', reviewObj )
  return async dispatch => {

    const response = await fetch(`http://localhost:8000/reviews/${reviewObj.id}`, {
      method: 'PUT',
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

      const response = await fetch(`http://localhost:8000/signup`, {
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
console.log('obj in action login', obj )
    const response = await fetch('http://localhost:8000/login', {
    method: 'POST',
    body: JSON.stringify(obj),
    headers: {
      'Content-type': 'application/json',
      'Accept': 'application/json'
    }
  })

   const JSONres = await response.json()

   console.log('jjjjjjjjjj', JSONres)

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
  console.log(review_id)
  
  return async dispatch => {
   
    const updatedVotes = status === 'Thumbs Up'? currentVote + 1: currentVote -1
   
      
      const response = await fetch(`http://localhost:8000/reviews/${review_id}`, {
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

  console.log('reviewObj in addReview action', reviewObj)

  return async dispatch => {

    const repsonse = await fetch(`http://localhost:8000/reviews`, {
      method: 'POST',
      body: JSON.stringify(reviewObj),
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json'
      }
    })




  }
   


}