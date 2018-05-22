import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import jwtDecode from'jwt-decode'
import SearchBox from './SearchBox'
import SearchResults from './SearchResults'
import { getAllRestaurants } from '../actions/index'
import NavBar from './NavBar'

class SearchPage extends Component {

  state = {
    isAuth: false,
    clearResult: true
  }

  componentDidMount() {
    console.log('username from params in Search page', this.props.match.params.username)
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

    this.props.getAllRestaurants()
  }

  handleClear = () => {
    this.setState({
      clearResult: !this.state.clearResult
    })
  }

  

  render() {
    document.body.style.backgroundColor = "white";

    const handleGoBack = () => {
      this.props.history.goBack()
          }
    
    return(
      <div>
        <NavBar isAuth={this.state.isAuth} urlUsername={this.props.match.params.username}/>
        <Button className="back-button" onClick={handleGoBack}>Back</Button>
        {/* <Link to={`/${this.props.match.params.username}`}>Back</Link> */}
        <SearchBox handleClear={this.handleClear}/>
        <div className="search-results">
          {this.state.clearResult? '': <SearchResults isAuth={this.state.isAuth} username={this.props.match.params.username} />}
        </div>
      </div>
    )
  }
  

}

const mapStateToProps = state => {
  return ({
    username: state.currentUser.username
  })
}

const mapDispatchToProps = dispatch => bindActionCreators({
  getAllRestaurants
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage)