import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import jwtDecode from'jwt-decode'
import { getUserInfo } from '../actions/index'

class Profile extends Component {

  componentDidMount() {
    
    // const token = localStorage.getItem('authorization')
    // const decoded = jwtDecode(token)
   
    this.props.getUserInfo(this.props.username)
    // //console.log(this.props.match.params.username)
    // const username = this.props.match.params.username
    // this.props.getUserInfo(username)
  }

  render() {
    

    const { currentUserInfo, username, isAuth } = this.props
    

    const displayEditPicButton = isAuth ?  <Button>Change Pic/Add Pic</Button>: ''
      

    const displayEditBioButton = isAuth ? 
      <Button>Edit</Button>:
      ''
      
    

    return(
      <div>
        <img src={currentUserInfo.profile_pic}/>
        {displayEditPicButton}
        <h3>{currentUserInfo.username}</h3>
        <p>{currentUserInfo.bio}</p>
        {displayEditBioButton}
        
      </div>

      
    )
  }

}

const mapStateToProps = state => {

  console.log('fffffff', state)
  return({
    currentUserInfo: state.currentUser
  })
}

const mapDispatchToProps = dispatch => bindActionCreators({
  getUserInfo
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Profile)

