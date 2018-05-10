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
import Filter from './Filter'
import { setMapLocation } from '../actions/index'


class FavoriteList extends Component {

handleClick = e => {
  console.log('GGGGGGGGG', e.target.parentNode.getAttribute('lat'))
  const lat = e.target.parentNode.getAttribute('lat')
  const lng = e.target.parentNode.getAttribute('lng')

  const coordinatesObj = {lat, lng}

  this.props.setMapLocation(coordinatesObj)
}

render() {

  const { restaurants, allUserReviews, username, userId, isAuth, setMapLocation } = this.props

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
        return <li key={restaurant.yelp_id} id={restaurant.yelp_id} className="restaurant" lat={restaurant.lat} lng={restaurant.lng} >
                 <img className="restaurant-img" src={restaurant.image} />
                 <h3>{restaurant.restaurant_name}</h3>
                 <p>{restaurant.address}</p>
                 <p>{restaurant.phone}</p>
                 <Button onClick={e => this.handleClick(e)}>Locate</Button>
                 {restaurant.review? <Link to={`/review/${restaurant.restaurant_name}/${username}/${restaurant.restaurant_id}/${restaurant.review.id}`}>Read Review</Link>: isAuth? <Link to={`/reviewform/${username}/${restaurant.restaurant_id}/${userId}`}>Write Review</Link>: ''}
               </li>
  })
  
  return (
    <div>
      <h2>My Favorite Restaurants List</h2>
      <Filter restaurants={restaurants}/>
      <ul>
      {displayList}
      </ul>
    </div>
  )
    
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

const mapDispatchToProps = dispatch => bindActionCreators({
  setMapLocation
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(FavoriteList)
