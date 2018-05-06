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
import { getUserInfo, getAllReviews, getUserRestaurants } from '../actions/index'
import NavBar from './NavBar';

class Main extends Component {

  state = {
    isAuth: false
  }

  componentDidMount() {
    console.log('username from params', this.props.match.params.username)
    //const username = this.props.match.params.username
    //this.props.getUserInfo(username)

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
  }

  render() {

    console.log('Auth???', this.state.isAuth)
    //const token = localStorage.getItem('authorization')
  //console.log('username?????', jwtDecode(token).sub.username)
  const username = this.state.isAuth? jwtDecode(localStorage.getItem('authorization')).sub.username: this.props.match.params.username
  this.props.getUserInfo(username)
  const userId = this.state.isAuth? jwtDecode(localStorage.getItem('authorization')).sub.id: this.props.userId
console.log('userId++++++>', userId)
    if(this.state.isAuth) {
      
      console.log('userId in Main is isAuth is true', userId)
      //this.props.getUserInfo(username)
      this.props.getUserRestaurants(userId)
      
    } else {
      //this.props.getUserInfo(this.props.match.params.username)
      this.props.getUserRestaurants(this.props.userId)
    }

    this.props.getAllReviews()
  
    
    return (
      <div>
        <div>
          <NavBar isAuth={this.state.isAuth}/>
          <div className="header">
            <div className="bg"></div>
            <Link to={`/searchPage/${username}`}>Search Restaurants</Link>
            <Profile isAuth={this.state.isAuth} username={username}/>
          </div>
          <div className="main-flex-container">
            <div className="about-me" >
            <div>
              <h2>About Me</h2>
              <p>Write Something about you</p>
              <Input type="textarea"/>
              </div>
              <div className="favorite-list"><FavoriteList userId={userId} isAuth={this.state.isAuth} /></div>
            </div>
            
            <div id="map" ><Map /></div>  

          </div>
        </div>
      </div>
    )

      
    // this.props.getUserRestaurants(userId)
    // this.props.getAllReviews()

    // return (
    //   <div>
    //     <div>
    //       <NavBar />
    //       <div className="header">
    //         <div className="bg"></div>
    //         <Link to={`/searchPage/${username}`}>Search Restaurants</Link>
    //         <Profile />
    //       </div>
    //       <div className="main-flex-container">
    //         <div className="about-me" >
    //         <div>
    //           <h2>About Me</h2>
    //           <p>Write Something about you</p>
    //           <Input type="textarea"/>
    //           </div>
    //           <div className="favorite-list"><FavoriteList userId={decoded.sub.id} /></div>
    //         </div>
            
    //         <div id="map" ><Map /></div>  

    //       </div>
    //     </div>
    //   </div>
    // )
  }

  
}

const mapStateToProps = state =>  {
  console.log('sssssss', state)
  return {
    userId: state.currentUser.id
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  getUserInfo,
  getUserRestaurants,
  getAllReviews
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Main)