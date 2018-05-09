import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'


class FavoriteList extends Component {

render() {

  const { restaurants, allUserReviews, username, userId, isAuth } = this.props

  const userReviews = allUserReviews.filter(review => review.user_id === userId)

  console.log('uuuuuuu====/', userReviews)

  restaurants.forEach(restaurant => {
    userReviews.forEach(review => {
      if(restaurant.restaurant_id === review.restaurant_id ) {
        restaurant.review = review
      }
    })
  })
  
  console.log('zzzzzzz', restaurants)
  
  const displayList = restaurants.map(restaurant => {
    console.log('vvvvvv', restaurant)
        return <li key={restaurant.yelp_id} id={restaurant.yelp_id} className="restaurant" lat={restaurant.lat} lng={restaurant.lng}>
                 <img className="restaurant-img" src={restaurant.image} />
                 <h3>{restaurant.restaurant_name}</h3>
                 <p>{restaurant.address}</p>
                 <p>{restaurant.phone}</p>
                 {restaurant.review? <Link to={`/review/${username}/${restaurant.restaurant_id}/${restaurant.review.id}`}>Read Review</Link>: isAuth? <Link to={`/reviewform/${username}/${restaurant.restaurant_id}/${userId}`}>Write Review</Link>: ''}
               </li>
  })
  
  return (
    <ul>
      {displayList}
    </ul>)
}

}


const mapStateToProps = state => {
  console.log('state in FavoriteList', state)
  return ({
    restaurants: state.favorites.restaurants,
    allUserReviews: state.reviews.reviews,
    username: state.currentUser.username
  })
}

export default connect(mapStateToProps, null)(FavoriteList)
