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

import { inputSearch, addFavoriteAndRestaurant, getAllReviews, getUserInfo, getUserRestaurants, updateUserFavorites, getAllRestaurants, addFavorite } from '../actions/index'

class SearchResults extends Component {

  componentDidMount () {
  
  const user_id = this.props.isAuth? jwtDecode(localStorage.getItem('authorization')).sub.id: this.props.displayUserId
    this.props.getAllReviews() 
    this.props.getUserRestaurants(user_id) 
    this.props.getAllRestaurants()
  }

  render() {

    const { restaurants, allReviews, addFavorite, isAuth, getAllReviews, userId, userFavorites, updateUserFavorites, getAllRestaurants } = this.props

    const handleAddFavorite = (e) => {
      if(!e.target.parentNode.classList.contains('chosen')) {
        e.target.parentNode.classList.add('chosen')
      } 
      else {
        e.target.parentNode.classList.remove('chosen')
      }

      if(e.target.parentNode.classList.contains('chosen')) {
        e.target.innerHTML = '&hearts;'
      } 
      else {
        e.target.innerHTML = '&#9825;'
      }

      const restaurantInfo = e.target.parentNode.children
      const restaurant_name = restaurantInfo[1].innerHTML
      const pic = restaurantInfo[0].src
      const address = restaurantInfo[2].innerHTML
      const phone = restaurantInfo[3].innerHTML
      const lat = e.target.parentNode.getAttribute('lat')
      const lng = e.target.parentNode.getAttribute('lng')
      const yelp_id = e.target.parentNode.getAttribute('id')

      const restaurantAlreadySaved = this.props.allRestaurants.filter(restaurant => restaurant.yelp_id === yelp_id)

      const restaurantObj = {
        restaurant_name,
        pic,
        address,
        phone,
        lat,
        lng,
        yelp_id
      }

      if(e.target.innerHTML === '♥' && restaurantAlreadySaved.length === 0) {
        this.props.addFavoriteAndRestaurant(userId, restaurantObj)
      } else if (e.target.innerHTML === '♥' && restaurantAlreadySaved.length > 0) {
        this.props.addFavorite(userId, restaurantAlreadySaved[0].id)
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
      })
    })

  const token = localStorage.getItem('authorization')

    const displayRestaurants = 
    restaurants.map(restaurant => {
      return <li key={restaurant.id} id={restaurant.id} restid={restaurant.restaurant_id} className="restaurant" lat={restaurant.coordinates.latitude} lng={restaurant.coordinates.longitude}>
                <img className="restaurant-img" src={restaurant.image_url} />
                <h3>{restaurant.name}</h3>
                <p>{`${restaurant.location.display_address[0]} ${restaurant.location.display_address[1]}`}</p>
                <p>{restaurant.display_phone}</p>
                {isAuth && !restaurant.is_favorite ? <span className="hollow-heart" onClick={e => handleAddFavorite(e) }>&#9825;</span>: isAuth && restaurant.is_favorite? <span className="heart">&#9829;</span> : ''} 
                {restaurant.review.length === 0 ? '': <Link to={`/allreviews/${this.props.username}/${restaurant.name}/${restaurant.review[0].restaurant_id}`} >Read ALL Users' Reviews</Link>}
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
  return ({
    restaurants: state.search.businesses,
    allRestaurants: state.restaurants.allRestaurants,
    allReviews: state.reviews.reviews,
    userId: state.currentUser.id,
    userFavorites: state.favorites.restaurants,
    displayUserId: state.displayUser.id
  })
}

const mapDispatchToProps = dispatch => bindActionCreators({
  inputSearch,
  addFavoriteAndRestaurant,
  addFavorite,
  getAllReviews,
  getUserInfo,
  getUserRestaurants,
  updateUserFavorites,
  getAllRestaurants
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults)
