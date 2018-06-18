import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap'
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
import { getUserInfo } from '../actions/index'

class NavBar extends Component {
  
  render() {
    const handleLogout = (e) => {
      localStorage.removeItem('authorization')
    }

    const token = localStorage.getItem('authorization')
    const logoutButton = token? 'Log Out': 'Log In'

    const handleRerender = () => {
      this.forceUpdate().bind(this)
    }

    const {history, isAuth, currentUser} = this.props
    const urlUsername = token? jwtDecode(token).sub.username: this.props.urlUsername
    const displayLoginLogout = token? <span className="logout">{jwtDecode(token).sub.username}<img className="avator" src={`${currentUser.profile_pic}`}/><Link to={'/'} onClick={e => handleLogout(e)} >Log Out</Link></span>: <Link to={'/'}>Log In</Link>
    const displaySignup = token? '': <Link className="signup" to={'/signup'}>Sign Up</Link>

    return(
      <div className="nav">
        <div className="logo">foodie<i className="fas fa-crown"></i>me</div>
        <div className="login-logout">
          <Link className="home-button" to={`/${urlUsername}`} onClick={handleRerender} >{urlUsername}'s Home</Link> 
          {/* <span className="logout">{currentUser.username}<img className="avator" src={`${currentUser.profile_pic}`}/><Link to={'/'} onClick={e => handleLogout(e)} >{logoutButton}</Link></span> */}
          {displayLoginLogout}
          {displaySignup}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  currentUser: state.currentUser 
})

export default connect(mapStateToProps, null)(NavBar)