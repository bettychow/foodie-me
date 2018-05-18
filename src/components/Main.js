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
import '../index.css'
import jwtDecode from'jwt-decode'
import FavoriteList from './FavoriteList'
import Map from './Map'
import Profile from './Profile'
import FollowedUsers from './FollowedUsers'
import { getUserInfo, getAllReviews, getUserRestaurants, getAllRestaurants, setMapLocation, resetMapLocation, getDisplayUser, getFollowedUsers } from '../actions/index'
import NavBar from './NavBar';


class Main extends Component {

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

    console.log('UUUUUUUUYYYYYYYYYY', this.props.match.params.username)

    //const username = jwtDecode(localStorage.getItem('authorization')).sub.username

    //console.log('NNNNNNNNAME', username)
    if (token && jwtDecode(localStorage.getItem('authorization')).sub.username === this.props.match.params.username) {
console.log('GEEEEEEEEEEEE')
      const decoded = jwtDecode(token)
      const userId = decoded.sub.id
      const username = decoded.sub.username
     
        this.props.getUserInfo(username)
        .then(result => {
          const userId = jwtDecode(localStorage.getItem('authorization')).sub.id
          this.props.getUserRestaurants(userId)
          this.props.getFollowedUsers('displayPage', userId)
        })
      } else {
console.log('UUUUUUUUYYYYYYYYYY//////////', this.props.match.params.username)
      this.props.getDisplayUser(this.props.match.params.username)
          .then(result => {
            const displayUserId = this.props.displayUserId
            this.props.getUserRestaurants(displayUserId)
            this.props.getFollowedUsers('displayPage', displayUserId)

            if(token && jwtDecode(localStorage.getItem('authorization')).sub.id !== this.props.displayUserId) {
              this.props.getFollowedUsers('decidedFollow', jwtDecode(localStorage.getItem('authorization')).sub.id)
            }
          })
    }

    
    

      this.props.getAllReviews()
      this.props.getAllRestaurants()
      this.props.getDisplayUser(this.props.match.params.username)
      
}

  resetMap = () => {
    
    this.props.resetMapLocation()
  }

  

  render() {
    document.body.style.backgroundColor = "white";

    const { userFavorites, allReviews, displayUserId } = this.props
    const userId = this.state.isAuth? jwtDecode(localStorage.getItem('authorization')).sub.id: this.props.userId
    const username = this.state.isAuth? jwtDecode(localStorage.getItem('authorization')).sub.username: this.props.match.params.username
    const displayMap = <Map favorites={userFavorites} />
    console.log('#############', displayUserId)
    const userReviews = allReviews.filter(review => review.user_id === displayUserId)
    
    return (
      
      <div>
        <div className="main">
          <NavBar isAuth={this.state.isAuth} urlUsername={this.props.match.params.username}/>
          <div className="header">
            <div className="bg"></div>
            <Profile isAuth={this.state.isAuth} username={username} currentUser={this.props.currentUser} userReviews={userReviews}  />
          </div>
          <div className="main-flex-container">
            <div className="left-container">
              <FavoriteList userId={userId} isAuth={this.state.isAuth} userReviews={userReviews} paramsUsername={this.props.match.params.username} />
            </div>
            <div className="right-flex-container">            
              <div id="map" >
                {displayMap}
                <Button className="reset-map-button" onClick={this.resetMap}>Reset Map</Button> 
              </div>
              <div>
                <h2>Users Followed</h2>
                <FollowedUsers followedUsers={this.props.followedUsers} />
              </div>
            </div>
            
                  
          </div>
        </div>
      </div>
    ) 
  }
}

const mapStateToProps = state =>  {
  console.log('sssssss', state)
  return {
    userId: state.currentUser.id,
    displayUserId: state.displayUser.id,
    currentUser: state.currentUser,
    userFavorites: state.favorites.restaurants,
    allReviews: state.reviews.reviews,
    followedUsers: state.follow.followedUsers
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  getUserInfo,
  getUserRestaurants,
  getAllReviews,
  getAllRestaurants,
  setMapLocation,
  resetMapLocation,
  getDisplayUser,
  getFollowedUsers
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Main)