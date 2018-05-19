import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from 'react-router-dom'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap'
import jwtDecode from'jwt-decode'
import { getAllReviews, getRestaurant } from '../actions/index'



class AllReviews extends Component {

  componentDidMount() {
    this.props.getAllReviews()
    this.props.getRestaurant(this.props.match.params.restaurant_id)
  }
  
  render() {

    const { allReviews, currentRestaurant } = this.props

    const token = localStorage.getItem('authorization')

    const currentUsername = token? jwtDecode(localStorage.getItem('authorization')).sub.username: this.props.match.params.username
    

    const allRestaurantReviews = allReviews.filter(review => {
      return review.restaurant_id === Number(this.props.match.params.restaurant_id)
    })

    console.log('??????', allRestaurantReviews)
    const displayReviews = allRestaurantReviews.map(review => {
      console.log('xxxxxx', review)
      return(
        <div key={review.username}>
        <h2>{review.username}</h2>
        <p>{review.title}</p>
        <Link to={`/review/${currentRestaurant.restaurant_name}/${review.username}/${review.restaurant_id}/${review.id}`}>Read Review</Link>
        
      </div>
      ) 
      
        
    })

    const handleGoBack = () => {
      this.props.history.goBack()
          }


    return(
      <div>
        <Button onClick={handleGoBack}>Back</Button>
        {/* <Link to={`/searchpage/${this.props.match.params.username}`} >Back to Search Restaurants</Link> */}
        <Link to={`/${currentUsername}`}>Back to Home</Link>
        {displayReviews}
      </div>
    )
  }

  

}

const mapStateToProps = state => {
  console.log('state in AllReviews', state)
  return({
    allReviews: state.reviews.reviews,
    currentRestaurant: state.restaurants.currentRestaurant
  })
}

const mapDispatchToProps = dispatch => bindActionCreators({
  getAllReviews,
  getRestaurant
}, dispatch)


export default connect(mapStateToProps, mapDispatchToProps)(AllReviews)