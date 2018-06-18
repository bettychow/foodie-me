import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import jwtDecode from'jwt-decode'
import { getUserInfo, updateUserInfo, addFollowPair, deleteFollowPair } from '../actions/index'

class Profile extends Component {

  state = {
    isEditing: false,
    imgURL: '',
    bio: ''
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

 handleFollow = e => {
  const followed = this.props.displayUserInfo.id
  const follower = this.props.currentUserInfo.id

  if(e.target.innerHTML === 'Follow') {
    this.props.addFollowPair(followed, follower)
    e.target.innerHTML = 'Unfollow'
  } else {
    e.target.innerHTML = 'Follow'
    this.props.deleteFollowPair(followed, follower)
  }
  
 }

 

  render() {

    const { currentUserInfo, username, isAuth, updateUserInfo, userReviews, displayUserInfo, addFollowPair, deleteFollowPair} = this.props
    const token = localStorage.getItem('authorization')
    const totalVotes = userReviews.reduce((sum, review) => {
      return sum + review.votes
    }, 0)

    const displayCrown = totalVotes > 4 && userReviews.length > 0? <div className="crown" ><i className="fas fa-crown"></i></div>: ''

    const inputStyle = {
      backgroundColor: 'white',
      width: 600,
      display: 'inline-block'
    }
    
    const displayEditButton = isAuth ? <Button className="edit-button" onClick={e => this.toggleEdit(e)} >{this.state.isEditing? 'Cancel': 'Edit Profile'}</Button>:''
    
    const displayInputBoxPic = this.state.isEditing? <Input type="text" placeholder={'  url of your profile picture'} style={inputStyle} onChange={e => this.handleEditPic(e)} value={this.state.imgURL}/> : ''

    const displayInputBoxBio = this.state.isEditing? <Input type="text" placeholder={'  About you'} style={inputStyle} onChange={e => this.handleEditBio(e)} value={this.state.bio}/> : ''
    
    const displaySaveButton = this.state.isEditing? <Button onClick={e => this.handleSave(e)}>Save</Button>: ''
    
    const displayFollowedOrNot = this.props.isFollowed ? 'Unfollow': 'Follow'
    
    const displayFollowButton = isAuth || !token? '': <Button onClick={e => this.handleFollow(e)}>{displayFollowedOrNot}</Button>

    return(
      <div className="profile">
        <h2 className="username" >{displayUserInfo.username}</h2>
        {displayCrown}
        <img className="profile-pic" src={displayUserInfo.profile_pic}/>
        {displayFollowButton}
        {displayInputBoxPic}
        <p className="bio">{displayUserInfo.bio}</p>
        {displayInputBoxBio}
        {displayEditButton}
        {displaySaveButton}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return({
    currentUserInfo: state.currentUser,
    displayUserInfo: state.displayUser,
    isFollowed: state.follow.isFollowed
  })
}

const mapDispatchToProps = dispatch => bindActionCreators({
  getUserInfo,
  updateUserInfo,
  addFollowPair,
  deleteFollowPair
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Profile)

