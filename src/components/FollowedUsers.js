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
import {  } from '../actions/index'

class FollowedUsers extends Component {

render() {

  const goToFollowed = () => {

    console.log('WWWWWWWWHAT IS THIS'), this
    this.forceUpdate().bind(this)
  }

  const displayFollowedUsers = this.props.followedUsers.map(user => {
    return  <li className="followed-user" key={user.followed_id}>
              <h2>{user.username}</h2>
              <img className="followed-user-pic" src={user.profile_pic}/>
              <Link to={`/${user.username}`} onClick={goToFollowed}>Go to {user.username}'s blog</Link>
            </li>
   
  })

  return(
    <div>
      <ul>
      {displayFollowedUsers}
      </ul>
    </div>
  )
}

}

export default FollowedUsers
