import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from 'react-router-dom'
import jwtDecode from'jwt-decode'

import { inputSearch, addToFavorite, getAllReviews, getUserInfo, getUserRestaurants, updateUserFavorites } from '../actions/index'

class SearchResults extends Component {


  componentDidMount () {
  
    const username = this.props.isAuth? jwtDecode(localStorage.getItem('authorization')).sub.username: this.props.username
    this.props.getAllReviews()
    this.props.getUserInfo(username)
      .then(result => {
        this.props.getUserRestaurants(this.props.userId)
      })
  }
  

render() {

 

  const { restaurants, allReviews, addToFavorite, isAuth, getAllReviews, userId, userFavorites, updateUserFavorites } = this.props

 


  const handleFavoriteToggle = (e) => {
    console.log('event in favorite', e.target.parentNode)

    if(!e.target.parentNode.classList.contains('chosen')) {
      e.target.parentNode.classList.add('chosen')
    } else {
      e.target.parentNode.classList.remove('chosen')
    }

    if(e.target.parentNode.classList.contains('chosen')) {
      e.target.innerHTML = '&hearts;'
    } else {
      e.target.innerHTML = '&#9825;'
    }
      
    console.log(e.target.parentNode.getAttribute('lat'))
    console.log('wwwww', e.target.parentNode.children)

    const restaurantInfo = e.target.parentNode.children
    const restaurant_name = restaurantInfo[1].innerHTML
    const pic = restaurantInfo[0].src
    const address = restaurantInfo[2].innerHTML
    const phone = restaurantInfo[3].innerHTML
    const lat = e.target.parentNode.getAttribute('lat')
    const lng = e.target.parentNode.getAttribute('lng')
    const yelp_id = e.target.parentNode.getAttribute('id')
    

    const restaurantObj = {
      restaurant_name,
      pic,
      address,
      phone,
      lat,
      lng,
      yelp_id
    }

    console.log('hearttttttt', e.target.innerHTML)
    if(e.target.innerHTML === '♥') {
      addToFavorite(userId, restaurantObj)
      
    }
  }

  restaurants.forEach(restaurant => {
    restaurant.review = []
    allReviews.forEach(review => {
      if(restaurant.id === review.yelp_id ) {
        restaurant.review = [...restaurant.review, review]
      }
    })
  })

  restaurants.forEach(restaurant => {
    
    restaurant.is_favorite = false
    userFavorites.forEach(favorite => {
      if(restaurant.id === favorite.yelp_id) {
        restaurant.is_favorite = true
        restaurant.restaurant_id = favorite.restaurant_id
      }
    } )
  })


console.log('xoxoxoxox', restaurants)
 

  const displayRestaurants = 
  restaurants.map(restaurant => {
    return <li key={restaurant.id} id={restaurant.id} restid={restaurant.restaurant_id} className="restaurant" lat={restaurant.coordinates.latitude} lng={restaurant.coordinates.longitude}>
              <img className="restaurant-img" src={restaurant.image_url} />
              <h3>{restaurant.name}</h3>
              <p>{`${restaurant.location.display_address[0]} ${restaurant.location.display_address[1]}`}</p>
              <p>{restaurant.display_phone}</p>
              {isAuth && !restaurant.is_favorite ? <span className="heart" onClick={e => handleFavoriteToggle(e) }>&#9825;</span>: ''}
              {restaurant.review.length === 0 ? '': <Link to={`/allreviews/${restaurant.restaurant_id}`} >Read Reviews</Link>}
           </li>
  })

   return (
     <ul className="search-list">
      {displayRestaurants}

     </ul>
   )

}
  
   
}


const mapStateToProps = state => {
  console.log('state in Search Result', state)
  return ({
    restaurants: state.search.businesses,
    allReviews: state.reviews.reviews,
    userId: state.currentUser.id,
    userFavorites: state.favorites.restaurants
  })
}

const mapDispatchToProps = dispatch => bindActionCreators({
  inputSearch,
  addToFavorite,
  getAllReviews,
  getUserInfo,
  getUserRestaurants,
  updateUserFavorites

}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults)
