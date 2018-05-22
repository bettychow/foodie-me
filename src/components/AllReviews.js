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
import NavBar from './NavBar'



class AllReviews extends Component {

  state = {
    isAuth: false
  }

  componentDidMount() {

    const token = localStorage.getItem('authorization')

    if(token) {
      const decoded = jwtDecode(token)
      const userId = decoded.sub.id
      const username = decoded.sub.username

      if(username === this.props.match.params.username ) {
        this.setState({
          isAuth: true
        })
      }
    }

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

    
    const displayReviews = allRestaurantReviews.map(review => {
      
      return(
        <div className="review-allReviews" key={review.username}>
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
        <NavBar isAuth={this.state.isAuth} urlUsername={this.props.match.params.username}/>
        <Button className ="back-button" onClick={handleGoBack}>Back</Button>
        <h2>All Reviews on {this.props.match.params.restaurant_name}</h2>
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