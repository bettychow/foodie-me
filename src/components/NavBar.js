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

const NavBar = ({history, isAuth}) => {
  

  const handleLogout = (e) => {
    localStorage.removeItem('authorization')
  }
  
  

  const logoutButton = isAuth? 'Log Out': 'Log In'
  return(
    <div className="nav">
    
      <div className="logo">foodie<i className="fas fa-crown"></i>me</div>
      {/* <Link to={`/${username}`} >Home</Link> */}
      <Link to={'/'} onClick={e => handleLogout(e)} className="logout">{logoutButton}</Link>
    </div>
  )
}

export default NavBar