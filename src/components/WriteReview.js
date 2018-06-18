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
import { addReview, getRestaurant } from '../actions/index'

class WriteReview extends Component {

  componentDidMount() {
    const restaurant_id = this.props.match.params.restaurant_id
    this.props.getRestaurant(restaurant_id)
  }

  state = {
    title: '',
    comment: '',
    dishes: '',
    food_rating: '',
    service_rating: '',
    pic_01: '',
    pic_02: '',
    pic_03: '',
    pic_04: ''
  }

  handleTitleChange = (e) => {
    this.setState({
      title: e.target.value
    })
  }

  handleCommentChange = e => {
    this.setState({
      comment: e.target.value
    })
  }

  handleDishesChange = e => {
    this.setState({
      dishes: e.target.value
    })
  }

  handleFoodRatingChange = e => {
    this.setState({
      food_rating: e.target.value
    })
  }

  handleServiceRatingChange = e => {
    this.setState({
      service_rating: e.target.value
    })
  }

  handlePic01Change = e => {
    this.setState({
      pic_01: e.target.value
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    const restaurant_id = this.props.match.params.restaurant_id
    const user_id = this.props.match.params.user_id
    const username = this.props.match.params.username
    const yelp_id = this.props.currentRestaurant.yelp_id
    const reviewObj = {...this.state, restaurant_id, user_id, username, yelp_id}

    this.props.addReview(reviewObj)
    this.props.history.push(`/${username}`)
  }

  handleCanel = () => {
    this.props.history.goBack()
  }
  
  render() {

    const {currentRestaurant} =this.props
    
    return(
      <div>
        <div>
          <h1>{currentRestaurant.restaurant_name}</h1>
          <p>{currentRestaurant.address}</p>
          <p>{currentRestaurant.phone}</p>
        </div>
        <Form className="write-review" onSubmit={e => this.handleSubmit(e)}>
          <FormGroup>
            <Label for="title">Title</Label>
            <Input
              type="text"
              name="title"
              id="title-field"
              placeholder="title"
              value={this.state.title}
              onChange={e => this.handleTitleChange(e)}
            />
          </FormGroup>
          <FormGroup>
            <Label for="comment">Comment</Label>
            <Input
              type="text"
              name="comment"
              id="comment-field"
              placeholder="comment"
              value={this.state.comment}
              onChange={e => this.handleCommentChange(e)}
            />
          </FormGroup>
          <FormGroup>
            <Label for="dishes">Recommended Dishes</Label>
            <Input
              type="text"
              name="dishes"
              id="dishes-field"
              placeholder="dishes"
              value={this.state.dishes}
              onChange={e => this.handleDishesChange(e)}
            />
          </FormGroup>
          <FormGroup>
            <Label for="food">Food Rating</Label>
            <Input
              type="text"
              name="food"
              id="food-field"
              placeholder=""
              value={this.state.food_rating}
              onChange={e => this.handleFoodRatingChange(e)}
            />
          </FormGroup>
          <FormGroup>
            <Label for="service">Service Rating</Label>
            <Input
              type="text"
              name="service"
              id="service-field"
              placeholder=""
              value={this.state.service_rating}
              onChange={e => this.handleServiceRatingChange(e)}
            />
          </FormGroup>
          <FormGroup>
            <Label for="pic_01">Pic_01</Label>
            <Input
              type="text"
              name="pic_01"
              id="pic_01-field"
              placeholder="image url"
              value={this.state.pic_01}
              onChange={e => this.handlePic01Change(e)}
            />
          </FormGroup>
          <FormGroup>
            <Label for="pic_02">Pic_02</Label>
            <Input
              type="text"
              name="pic_02"
              id="pic_02-field"
              placeholder="image url"
              value={this.state.pic_02}
              onChange={e => this.handlePic01Change(e)}
            />
          </FormGroup>
          <FormGroup>
            <Label for="pic_03">Pic_03</Label>
            <Input
              type="text"
              name="pic_03"
              id="pic_03-field"
              placeholder="image url"
              value={this.state.pic_03}
              onChange={e => this.handlePic01Change(e)}
            />
          </FormGroup>
          <FormGroup>
            <Label for="pic_04">Pic_04</Label>
            <Input
              type="text"
              name="pic_04"
              id="pic_04-field"
              placeholder="image url"
              value={this.state.pic_04}
              onChange={e => this.handlePic01Change(e)}
            />
          </FormGroup>
          <Button>Submit</Button> <Button onClick={this.handleCanel}>Cancel</Button>
        </Form>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return({ 
    currentRestaurant: state.restaurants.currentRestaurant
  })
}

const mapDispatchToProps = dispatch => bindActionCreators({
  getRestaurant,
  addReview
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(WriteReview)