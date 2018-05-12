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
import { sortByTime, getUserRestaurants } from '../actions/index'

class Filter extends Component {

  handleChangeTime = (event) => {

    if(event.target.value === 'allRestaurants') {
      this.props.getUserRestaurants(this.props.userId)
    } else {
      this.props.sortByTime(event.target.value)
    }
  }

  render() {

    return(
      <form>
      <label>
       Filter by :
        <select className="dropDown" onChange={this.handleChangeTime}>
          <option value="allRestaurants">All Restaurants</option>
          <option value="latestFirst">Latest Reviews First</option>
          <option value="oldestFirst">Oldest Reviews First</option>
        </select>
      </label>
    </form>
    )
  }
}

const mapStateToProps = state => ({
  restaurants: state.favorites.restaurants,
  userId: state.currentUser.id,
})


const mapDispatchToProps = dispatch => bindActionCreators({
   sortByTime,
   getUserRestaurants
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Filter)