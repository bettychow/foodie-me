/*global FB*/

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from 'react-router-dom'

import '../index.css'
import jwtDecode from'jwt-decode'
import { FacebookShareButton, FacebookIcon, FacebookShareCount,  TwitterShareButton, TwitterIcon } from 'react-share'
import DocumentMeta from 'react-document-meta'
import { getCurrentReview, vote, getRestaurant, deleteReview } from '../actions/index'
import ReviewForm from './ReviewForm'
import NavBar from './NavBar';

class Review extends Component {

  state = {isEditing: false}
  

  componentDidMount() {
    this.props.getCurrentReview(this.props.match.params.reviewid)
    this.props.getRestaurant(this.props.match.params.restaurant_id)
    

    //console.log('????????', FB)
  //   window.fbAsyncInit = function() {
  //     //SDK loaded, initialize it

  //     FB.init({
  //       appId      : '207666283375899',
  //       status     : true,
  //       xfbml      : true,
  //       version    : 'v2.7' // or v2.6, v2.5, v2.4, v2.3
  //     });

  //     // FB.init({
  //     //     appId      : '207666283375899',
  //     //     xfbml      : true,
  //     //     version    : 'v2.7'
  //     // });
  //     //JS SDK initialized, now you can use it
  //     FB.XFBML.parse();
  // };

  //   (function(d, s, id) {
  //     var js, fjs = d.getElementsByTagName(s)[0];
  //     if (d.getElementById(id)) return;
  //     js = d.createElement(s); js.id = id;
  //     js.src = 'https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v3.0&appId=207666283375899';
  //     fjs.parentNode.insertBefore(js, fjs);
  //   }(document, 'script', 'facebook-jssdk'))
 

    window.twttr = (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0],
        t = window.twttr || {};
      if (d.getElementById(id)) return t;
      js = d.createElement(s);
      js.id = id;
      js.src = "https://platform.twitter.com/widgets.js";
      fjs.parentNode.insertBefore(js, fjs);
    
      t._e = [];
      t.ready = function(f) {
        t._e.push(f);
      };

      console.log("Review componentDidMount is happening!!!! ***")
    
      return t;
    }(document, "script", "twitter-wjs"));
  }

  shouldComponentUpdate() {

    return true
  }

  componentDidUpdate() {
    window.twttr = (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0],
        t = window.twttr || {};
      if (d.getElementById(id)) return t;
      js = d.createElement(s);
      js.id = id;
      js.src = "https://platform.twitter.com/widgets.js";
      fjs.parentNode.insertBefore(js, fjs);
    
      t._e = [];
      t.ready = function(f) {
        t._e.push(f);
      };

      console.log("Review componentDidUpdate is happening!!!! ***")
    
      return t;
    }(document, "script", "twitter-wjs"));
  }
  

  toggleEdit() {
    this.setState({isEditing: !this.state.isEditing})
  }

  handleDelete = (e) => {
    const result = window.confirm("Want to delete?")
    const review_id = this.props.currentReview.id

    if(result) {
      this.props.deleteReview(review_id)
      const username = this.props.match.params.username
      this.props.history.push(`/${username}`)
    }
  }

  render() {

    const meta = {
      title: `hello`,
      description: 'I am a description, and I can create multiple tags',
      canonical: `https://gentle-taiga-80518.herokuapp.com/review/Gochi%20Japanese%20Fusion%20Tapas/bettychow/1/1`,
      meta: {
        charSet: 'utf-8',
        name: {
          keywords: 'react,meta,document,html,tags'
        }
      }
    };


    this.toggleEdit = this.toggleEdit.bind(this)
    const token = localStorage.getItem('authorization')
    const { reviewid , username } = this.props.match.params
    const { currentReview, currentRestaurant, getRestaurant, vote, deleteReview } = this.props
    const currentUsername = token? jwtDecode(localStorage.getItem('authorization')).sub.username: this.props.match.params.username
    

    const restaurant_ID = this.props.match.params.restaurant_id

    const handleVote = e => {
      
        if(!localStorage.getItem(`votedForReview${currentReview.id}`)) { 
          vote(reviewid, currentReview.votes, e.target.innerHTML)
          localStorage[`votedForReview${currentReview.id}`] = true
        }
    }

    const handleGoBack = () => {
this.props.history.goBack()
    }
    
    const displayEditButton = token && jwtDecode(token).sub.username === username? <Button onClick={this.toggleEdit}>Edit</Button>: ''
    const displayDeleteButton = token && jwtDecode(token).sub.username === username? <Button onClick={e => this.handleDelete(e)}>Delete</Button>: ''
    const displayUpVoteButton = token && jwtDecode(token).sub.username === username? '': <Button onClick={e => handleVote(e)}>Thumbs Up</Button>
    const displayDownVoteButton = token && jwtDecode(token).sub.username === username? '': <Button onClick={e => handleVote(e)}>Thumbs Down</Button>
    const displayVoteMessage = localStorage.getItem(`votedForReview${currentReview.id}`)? '  Thank you for your vote!': ''

    const sharedURL = `http://localhost:3000/review/${currentRestaurant.restaurant_name}/bettychow/1/1`
    if(this.state.isEditing) {
      return(
        <ReviewForm {...this.state} currentRestaurant={currentRestaurant} currentReview={currentReview} toggleEdit={this.toggleEdit} />
      )
    } else {
      return(
        <DocumentMeta >
        
          <div>
            <DocumentMeta {...meta} />
            <NavBar isAuth={this.state.isAuth} urlUsername={this.props.match.params.username}/>
            <Link className="link-to-allreviews" to={`/allreviews/${currentUsername}/${this.props.match.params.restaurant_name}/${currentRestaurant.id}`}>See all reviews of {currentRestaurant.restaurant_name}</Link>
            <Link to={`/${this.props.match.params.username}`}>Go to {this.props.match.params.username}'s blog</Link>
            <Button className="back-button" onClick={handleGoBack}>Back</Button>
            <h3>{this.props.match.params.username}'s review on {currentRestaurant.restaurant_name}</h3>
            <p>{currentRestaurant.address}</p>
            <p>{currentRestaurant.phone}</p>
            <div className="review-body">
              <h4 className="review-title">{currentReview.title}</h4>
              <p>{currentReview.comment}</p>
              <h5>Recommended Dishes</h5>
              <p>{currentReview.dishes}</p>
              <h5>Food Rating</h5>
              <p>{currentReview.food_rating}</p>
              <h5>Service Rating</h5>
              <p>{currentReview.service_rating}</p>
              <img className="food-image" src={currentReview.pic_01}/>
              <img className="food-image" src={currentReview.pic_02}/>
              <img className="food-image" src={currentReview.pic_03}/>
              <img className="food-image" src={currentReview.pic_04}/>
              {displayEditButton}
              {displayDeleteButton}           
            </div>
            <div className="votes">
              <h5 className="votes-title">Votes</h5>
              <span>{currentReview.votes}</span>
            </div>
            {displayUpVoteButton}
            {displayDownVoteButton}
            {displayVoteMessage}
            <div id="fb-root"></div>
            {/* <div className="fb-share-button" data-href="https://gentle-taiga-80518.herokuapp.com/review/Gochi%20Japanese%20Fusion%20Tapas/bettychow/1/1" data-layout="button" data-size="small" data-mobile-iframe="true"><a target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fgentle-taiga-80518.herokuapp.com%2Freview%2FGochi%2520Japanese%2520Fusion%2520Tapas%2Fbettychow%2F1%2F1&amp;src=sdkpreparse" className="fb-xfbml-parse-ignore">Share</a></div> */}
          {/* <FacebookShareButton
            url={'https://gentle-taiga-80518.herokuapp.com/review/Gochi%20Japanese%20Fusion%20Tapas/bettychow'}
            quote={'hello'}
            className="Demo__some-network__share-button">
            <FacebookIcon
              size={32}
              round />
          </FacebookShareButton> */}

          {/* <TwitterShareButton
            url={sharedURL}
            title={'hello'}
            className="Demo__some-network__share-button">
            <TwitterIcon
              size={32}
              round />
          </TwitterShareButton> */}

        <div className="twitter-button">
          <a href="https://twitter.com/share?ref_src=twsrc%5Etfw" className="twitter-share-button" data-show-count="false">Tweet</a>
        </div>
        {/* <script async src="https://platform.twitter.com/widgets.js" charSet="utf-8"></script> */}
          </div>
          </DocumentMeta>
      )
    }
  }
}

const mapStateToProps = state => {
  console.log('state in Review', state)
  return ({
    currentReview: state.reviews.currentReview,
    currentRestaurant: state.restaurants.currentRestaurant,
    currentUser: state.currentUser.username
  })
}

const mapDispatchToProps = dispatch => bindActionCreators({
  getRestaurant,
  getCurrentReview,
  vote,
  deleteReview
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Review)