import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import jwtDecode from'jwt-decode'
import { getUserInfo, updateUserInfo } from '../actions/index'

class Profile extends Component {

  state = {
    isEditing: false,
    imgURL: '',
    bio: ''
  }

  componentDidMount() {

    this.props.getUserInfo(this.props.username)
      .then(result => {
        this.setState({
          imgURL: this.props.currentUserInfo.profile_pic,
          bio: this.props.currentUserInfo.bio
        })
      })
  }

  

  toggleEdit = (e) => {
    this.setState({
      isEditing: !this.state.isEditing
    })
  }

  handleEditPic = e => {
    this.setState({
      imgURL: e.target.value
    })
  }

 handleEditBio = e => {
   this.setState({
     bio: e.target.value
   })
 }

 handleSave = e => {
    const profile_pic = this.state.imgURL
    const bio = this.state.bio
    const updatedInfo = {profile_pic, bio}
    const username = this.props.username
    this.props.updateUserInfo(updatedInfo, username)
    this.setState({
      isEditing: false
    })
 }

  render() {

    const { currentUserInfo, username, isAuth, updateUserInfo} = this.props

    const inputStyle = {
      backgroundColor: 'white',
      width: 600,
      display: 'inline-block'
    }
    
    const displayEditButton = isAuth ? <Button className="edit-button" onClick={e => this.toggleEdit(e)} >{this.state.isEditing? 'Cancel': 'Edit Profile'}</Button>:''
    
    const displayInputBoxPic = this.state.isEditing? <Input type="text" placeholder={'  url of your profile picture'} style={inputStyle} onChange={e => this.handleEditPic(e)} value={this.state.imgURL}/> : ''

    const displayInputBoxBio = this.state.isEditing? <Input type="text" placeholder={'  About you'} style={inputStyle} onChange={e => this.handleEditBio(e)} value={this.state.bio}/> : ''
    const displaySaveButton = this.state.isEditing? <Button onClick={e => this.handleSave(e)}>Save</Button>: ''

    

    return(
      <div>
        <h3 className="username" >Hi {currentUserInfo.username}</h3>
        <img className="profile-pic" src={currentUserInfo.profile_pic}/>
        {displayInputBoxPic}
        <p className="bio">{currentUserInfo.bio}</p>
        {displayInputBoxBio}
        {displayEditButton}
        {displaySaveButton}
        
      </div>
      
    )
  }
}

const mapStateToProps = state => {

  console.log('state in profile', state)
  return({
    currentUserInfo: state.currentUser
  })
}

const mapDispatchToProps = dispatch => bindActionCreators({
  getUserInfo,
  updateUserInfo
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Profile)

