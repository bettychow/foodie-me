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
import jwtDecode from'jwt-decode'
import FavoriteList from './FavoriteList'
import Map from './Map'
import Profile from './Profile'
import { getUserInfo, getAllReviews, getUserRestaurants, getAllRestaurants, setMapLocation, resetMapLocation } from '../actions/index'
import NavBar from './NavBar';


class Main extends Component {

  state = {
    isAuth: false
  }

  componentDidMount() {
    console.log('username from params', this.props.match.params.username)

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

    const username = this.state.isAuth? jwtDecode(localStorage.getItem('authorization')).sub.username: this.props.match.params.username
    this.props.getUserInfo(username)
      .then(result => {
        const userId = this.state.isAuth? jwtDecode(localStorage.getItem('authorization')).sub.id: this.props.userId
        this.props.getUserRestaurants(userId)
        this.props.getAllReviews()
      })
    
      this.props.getAllRestaurants()

  }

  resetMap = () => {
    
    this.props.resetMapLocation()
  }

  

  render() {
    document.body.style.backgroundColor = "white";

    const { userFavorites } = this.props
    const userId = this.state.isAuth? jwtDecode(localStorage.getItem('authorization')).sub.id: this.props.userId
    const username = this.state.isAuth? jwtDecode(localStorage.getItem('authorization')).sub.username: this.props.match.params.username
    const displayMap = <Map favorites={userFavorites} />
    
    return (
      
      <div>
        <div className="main">
          <NavBar isAuth={this.state.isAuth}/>
          <div className="header">
            <div className="bg"></div>
            <Profile isAuth={this.state.isAuth} username={username} currentUser={this.props.currentUser} />
          </div>
          <div className="main-flex-container">
            <div className="favorite-list">
              <FavoriteList userId={userId} isAuth={this.state.isAuth} />
            </div>            
            <div id="map" >
              {displayMap}
              <Button onClick={this.resetMap}>Reset Map</Button> 
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
    currentUser: state.currentUser,
    userFavorites: state.favorites.restaurants
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  getUserInfo,
  getUserRestaurants,
  getAllReviews,
  getAllRestaurants,
  setMapLocation,
  resetMapLocation
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Main)