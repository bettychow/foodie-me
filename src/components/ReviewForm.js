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
import { getCurrentReview, updateReview } from '../actions/index'


class ReviewForm extends Component {

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

  componentDidMount () {
    const { id, title, comment, dishes, food_rating, service_rating, pic_01, pic_02, pic_03, pic_04 } = this.props.currentReview
    this.setState({
      title,
      comment,
      dishes,
      food_rating,
      service_rating,
      pic_01,
      pic_02,
      pic_03,
      pic_04
    })
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
    const id = this.props.currentReview.id
    const reviewObj = {...this.state, id}
    this.props.updateReview(reviewObj)
    this.setState({ ...this.state, isEditing: false })
  }
  render() {

    const { currentReview } = this.props

    
    return(
      <div>
        <Form onSubmit={e => this.handleSubmit(e)}>
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
            {/* {!this.state.name && this.state.isSubmit ? <Alert color="primary">Please enter your name</Alert>: '' } */}
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
            {/* {!this.state.name && this.state.isSubmit ? <Alert color="primary">Please enter your name</Alert>: '' } */}
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
            {/* {!this.state.name && this.state.isSubmit ? <Alert color="primary">Please enter your name</Alert>: '' } */}
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
            {/* {!this.state.name && this.state.isSubmit ? <Alert color="primary">Please enter your name</Alert>: '' } */}
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
            {/* {!this.state.name && this.state.isSubmit ? <Alert color="primary">Please enter your name</Alert>: '' } */}
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
            {/* {!this.state.name && this.state.isSubmit ? <Alert color="primary">Please enter your name</Alert>: '' } */}
          </FormGroup>
          <Button>Submit</Button>
        </Form>
      </div>
    )
  }
}


const mapDispatchToProps = dispatch => bindActionCreators({
  updateReview
}, dispatch)


export default connect(null, mapDispatchToProps)(ReviewForm)