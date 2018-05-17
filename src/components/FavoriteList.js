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
import { setMapLocation, deleteReview, deleteUserFavorite } from '../actions/index'


class FavoriteList extends Component {

handleLocate = e => {
  const lat = Number(e.target.parentNode.getAttribute('lat'))
  const lng = Number(e.target.parentNode.getAttribute('lng'))

  const coordinatesObj = {lat, lng}
  

  this.props.setMapLocation(coordinatesObj)
}

handleDelete = (e) => {
  const result = window.confirm("Want to delete?")
  const review_id = e.target.parentNode.getAttribute('reviewid')
  const restaurant_id = e.target.parentNode.getAttribute('id')
  const user_id = this.props.userId
  

  if(result) {
    if(review_id > 0) {

      this.props.deleteReview(review_id)
    }

    const userRestaurantObj = { user_id, restaurant_id }
    this.props.deleteUserFavorite( userRestaurantObj )
  }
}

render() {

  const { restaurants, allUserReviews, username, userId, isAuth, setMapLocation, deleteReview, deleteUserFavorite, userReviews } = this.props

  restaurants.forEach(restaurant => {
    userReviews.forEach(review => {
      if(restaurant.restaurant_id === review.restaurant_id ) {
        restaurant.review = review
      }
    })
  })

  const displayTrashIcon = isAuth?  <i className="far fa-trash-alt trash" onClick={e => this.handleDelete(e)}></i>: ''
  
  const displayList = restaurants.map(restaurant => {
        return <li key={restaurant.yelp_id} id={restaurant.restaurant_id} className="restaurant" lat={restaurant.lat} lng={restaurant.lng} reviewid={restaurant.review? restaurant.review.id: 0} >
                 <img className="restaurant-img" src={restaurant.pic} />
                 <h3 className="restaurant-name">{restaurant.restaurant_name}</h3>
                 <p className="restaurant-address">{restaurant.address}</p>
                 <p className="restaurant-phone">{restaurant.phone}</p>
                 <Button className="locate-button" onClick={e => this.handleLocate(e)}>Locate</Button>
                 {restaurant.review? <Link className="read-review-link" to={`/review/${restaurant.restaurant_name}/${restaurant.review.username}/${restaurant.restaurant_id}/${restaurant.review.id}`}>Read Review</Link>: isAuth? <Link className="write-review-link" to={`/reviewform/${username}/${restaurant.restaurant_id}/${userId}`}>Write Review</Link>: ''}
                 {displayTrashIcon}
               </li>
  })
  
  return (
    <div>
      <h2 style={{marginTop: 20}}>My Favorite Restaurants List</h2>
      <Link to={`/searchpage/${username}`}>Search Restaurants</Link>
      <Filter restaurants={restaurants}/>
      <ul className="favorite-list">
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
    username: state.currentUser.username,
    displayUserId: state.displayUser.id
  })
}

const mapDispatchToProps = dispatch => bindActionCreators({
  setMapLocation,
  deleteReview,
  deleteUserFavorite
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(FavoriteList)
