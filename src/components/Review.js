import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from 'react-router-dom'
import jwtDecode from'jwt-decode'
import { getCurrentReview, vote, getRestaurant, deleteReview } from '../actions/index'
import ReviewForm from './ReviewForm';

class Review extends Component {

  state = {isEditing: false}
  

  componentDidMount() {
    console.log('reviewid in Review', this.props.match.params.reviewid)
    this.props.getCurrentReview(this.props.match.params.reviewid)
    this.props.getRestaurant(this.props.match.params.restaurant_id)
 
  }

  toggleEdit() {
    this.setState({isEditing: !this.state.isEditing})
  }

  handleDelete = (e) => {
    const result = window.confirm("Want to delete?")
    const review_id = this.props.currentReview.id

    console.log('{{{{{{', review_id)
    if(result) {
      this.props.deleteReview(review_id)
      const username = this.props.match.params.username
      this.props.history.push(`/${username}`)
    }
  }

  
  //this.toggleEdit = this.toggleEdit.bind(this)

  render() {
    this.toggleEdit = this.toggleEdit.bind(this)
    const token = localStorage.getItem('authorization')
    const { reviewid , username } = this.props.match.params
    const { currentReview, currentRestaurant, getRestaurant, vote, deleteReview } = this.props
    const currentUsername = token? jwtDecode(localStorage.getItem('authorization')).sub.username: this.props.match.params.username
    
    console.log('curretnUserNAame ?????', currentUsername)
    
    // const decoded = jwtDecode(token)
    // const currentUser = decoded.sub.username

    const restaurant_ID = this.props.match.params.restaurant_id

    console.log('zzzzzzzz', restaurant_ID)

    const handleVote = e => {
      vote(reviewid, currentReview.votes, e.target.innerHTML)
      if(localStorage[`votedForReview${currentReview.id}`] === true) {
        return
      } else {
        localStorage[`votedForReview${currentReview.id}`] = true
      }
    }
    
    const displayEditButton = token && jwtDecode(token).sub.username === username? <Button onClick={this.toggleEdit}>Edit</Button>: ''
    const displayDeleteButton = token && jwtDecode(token).sub.username === username? <Button onClick={e => this.handleDelete(e)}>Delete</Button>: ''
    const displayUpVoteButton = token && jwtDecode(token).sub.username === username? '': <Button onClick={e => handleVote(e)}>Thumbs Up</Button>
    const displayDownVoteButton = token && jwtDecode(token).sub.username === username? '': <Button onClick={e => handleVote(e)}>Thumbs Down</Button>

    console.log('HHHHHHHH', this.props.currentUser)
    if(this.state.isEditing) {
      return(
        <ReviewForm {...this.state} currentRestaurant={currentRestaurant} currentReview={currentReview} toggleEdit={this.toggleEdit} />
      )
    } else {
      return(
        <div>
          <Link to={`/allreviews/${currentUsername}/${currentRestaurant.id}`}>See all reviews of {currentRestaurant.restaurant_name}</Link>
          <Link to={`/${currentUsername}`}>Back to Home</Link>
          <h3>{currentRestaurant.restaurant_name}</h3>
          <p>{currentRestaurant.address}</p>
          <p>{currentRestaurant.phone}</p>
          <div className="review-body">
            <h4 className="review-title">{currentReview.title}</h4>
            <p>{currentReview.comment}</p>
            <h5>Recommended Dishes</h5>
            <p>{currentReview.dishes}</p>
            <h5>Food Rating</h5>
            <p>{currentReview.food_rating}</p>
            <h5>Service Rating</h5>
            <p>{currentReview.service_rating}</p>
            <img className="food-image" src={currentReview.pic_01}/>
            <img className="food-image" src={currentReview.pic_02}/>
            <img className="food-image" src={currentReview.pic_03}/>
            <img className="food-image" src={currentReview.pic_04}/>
            {displayEditButton}
            {displayDeleteButton}           
          </div>
          <h5>Votes</h5>
          <span>{currentReview.votes}</span>
          {displayUpVoteButton}
          {displayDownVoteButton}
        </div>
      )
    }
  }
}

const mapStateToProps = state => {
  console.log('state in Review', state)
  return ({
    currentReview: state.reviews.currentReview,
    currentRestaurant: state.restaurants.currentRestaurant,
    currentUser: state.currentUser.username
  })
}

const mapDispatchToProps = dispatch => bindActionCreators({
  getRestaurant,
  getCurrentReview,
  vote,
  deleteReview
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Review)