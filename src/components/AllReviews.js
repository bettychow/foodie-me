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
import { getAllReviews } from '../actions/index'



class AllReviews extends Component {

  componentDidMount() {
    this.props.getAllReviews()
  }
  
  render() {

    const { allReviews } = this.props

    console.log('cccccccc', allReviews)

    console.log('iiiiiiddddd', this.props.match.params.restaurant_id)

    const allRestaurantReviews = allReviews.filter(review => {
      console.log('lllll', review) 
      
      return review.restaurant_id === Number(this.props.match.params.restaurant_id)
    })

    console.log('??????', allRestaurantReviews)
    const displayReviews = allRestaurantReviews.map(review => {
      console.log('xxxxxx', review)
      return(
        <div key={review.yelp_id}>
        <h2>{review.username}</h2>
        <p>{review.title}</p>
        <Link to={`/review/${review.username}/${review.restaurant_id}/${review.user_id}`}>Read Review</Link>
      </div>
      ) 
      
        
    })


    return(
      <div>{displayReviews}</div>
    )
  }

  

}

const mapStateToProps = state => {
  console.log('state in AllReviews', state)
  return({
    allReviews: state.reviews.reviews
  })
}

const mapDispatchToProps = dispatch => bindActionCreators({
  getAllReviews
}, dispatch)


export default connect(mapStateToProps, mapDispatchToProps)(AllReviews)